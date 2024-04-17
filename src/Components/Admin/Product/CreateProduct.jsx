import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
// import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const CreateProduct = () => {
   const navigate = useNavigate();
   const [allCategory, setAllCategory] = useState([]);
   const [allSubcategory, setAllSubcategory] = useState([]);
   const [allsize, setAllSize] = useState([])
   const [data, setData] = useState({
      name: "",
      maincategory: "",
      subcategory: "",
      brand: "",
      color: "",
      sizename: "",
      stock: "",
      description: "",
      pic1: "",
      pic2: "",
      pic3: "",
      pic4: ""
   });
   const [selectedMainCategory, setSelectedMainCategory] = useState("");

   const getInputData = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const getInputFile = (e) => {
      const { name, files } = e.target;
      setData({ ...data, [name]: files[0] });
   };

   const getApiDataCategory = async () => {
      try {
         let res = await axios.get("https://prv-backend-github-io.onrender.com/api/category");
         setAllCategory(res.data.data);
      } catch (error) {
         console.log(error);
      }
   };

   const getApiDataSubCategory = async () => {
      try {
         let res = await axios.get("https://prv-backend-github-io.onrender.com/api/subcategory");
         setAllSubcategory(res.data.data);
      } catch (error) {
         console.log(error);
      }
   };
   const getApiDataSize = async () => {
      try {
         let res = await axios.get("https://prv-backend-github-io.onrender.com/api/size");
         setAllSize(res.data.data);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getApiDataCategory();
      getApiDataSubCategory();
      getApiDataSize()
   }, []);

   const filterSubcategories = () => {
      return allSubcategory.filter(subcategory => subcategory.maincategory === selectedMainCategory);
   };

   const filterSize = () => {
      return allsize.filter(size => size.maincategory === selectedMainCategory);
   };


   const formData = new FormData();
   formData.append("name", data.name);
   formData.append("brand", data.brand);
   formData.append("maincategory", data.maincategory);
   formData.append("subcategory", data.subcategory);
   formData.append("color", data.color);
   formData.append("sizename", data.sizename);
   formData.append("stock", data.stock);
   formData.append("description", data.description);
   formData.append("pic1", data.pic1);
   formData.append("pic2", data.pic2);
   formData.append("pic3", data.pic3);
   formData.append("pic4", data.pic4);

   const postData = async (e) => {
      e.preventDefault();
      try {
         const token = localStorage.getItem('token');
         const res = await axios.post('https://prv-backend-github-io.onrender.com/api/product', formData, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
         console.log(res);
         if (res.status === 200) {
            toast.success("Product added successfully");
            navigate("/admin/product");
         } else {
            toast.error("Failed to add product");
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <div className="blue_bg mt-5">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <div className="titlepage">
                        <h2 className='text-center mb-5'>Add A New Product</h2>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="container-fluid">
            <div className="row">
               <div className="col-md-3" style={{ marginTop: "-35px" }}>
                  <Sidebar />
               </div>
               <div className="col-md-9 ">
                  <form action="" >
                     <div className="row">
                        <div className='col'>
                           <label htmlFor="">Product Name <span className='text-danger'>*</span></label>
                           <input type="text" className="form-control" name='name' onChange={getInputData} required placeholder="Product Name" />
                        </div>
                        <div className='col'>
                           <label htmlFor="">Product Category <span className='text-danger'>*</span></label>
                           <select name="maincategory" onChange={(e) => { getInputData(e); setSelectedMainCategory(e.target.value); }} className='form-control'>
                              <option selected disabled>Choose Category</option>
                              {
                                 allCategory.map((item, index) => {
                                    return <option key={index} value={item.maincategory}>{item.maincategory}</option>;
                                 })
                              }
                           </select>
                        </div>
                        <div className='col'>
                           <label htmlFor="">Product Sub Category <span className='text-danger'>*</span></label>
                           <select name="subcategory" onChange={getInputData} className='form-control'>
                              <option selected disabled>Choose Sub Category</option>
                              {
                                 filterSubcategories().map((item, index) => {
                                    return <option key={index} value={item.subcategory}>{item.subcategory}</option>;
                                 })
                              }
                           </select>
                        </div>
                     </div>
                     <div className="row">
                        <div className='col'>
                           <label htmlFor="">Product Brand <span className='text-danger'>*</span></label>
                           <input type="text" className="form-control" name='brand' onChange={getInputData} required placeholder="Product color Name " />
                        </div>
                        <div className='col'>
                           <label htmlFor="">Product Color <span className='text-danger'>*</span></label>
                           <input type="text" className="form-control" name='color' onChange={getInputData} required placeholder="Product color Name " />
                        </div>
                        <div className='col'>
                           <label htmlFor="">Product Size <span className='text-danger'>*</span></label>
                           <select name="sizename" onChange={getInputData} className='form-control'>
                              <option selected disabled>Choose Size</option>
                              {
                                 filterSize().map((item, index) => {
                                    return <option key={index} value={item.sizename}>{item.sizename}</option>;
                                 })
                              }
                           </select>
                        </div>
                        <div className='col'>
                           <label htmlFor="">Product Stock <span className='text-danger'>*</span></label>
                           <input type="Number" className="form-control" name='stock' onChange={getInputData} required placeholder="Product Stock" />
                        </div>
                     </div>
                     <div className="row">
                        <div className="mb-3">
                           <label>Descriptiion</label>
                           <textarea name="description" rows="5" className='form-control' placeholder='Description...' onChange={getInputData}></textarea>
                        </div>
                     </div>
                     <div className="row">
                        <div className='col'>
                           <label htmlFor="">Product Pic <span className='text-danger'>*</span></label>
                           <input type="file" className="form-control" name='pic1' onChange={getInputFile} required placeholder="Product Pic" />
                        </div>
                        <div className='col'>
                           <label htmlFor="">Product Pic <span className='text-danger'>*</span></label>
                           <input type="file" className="form-control" name='pic2' onChange={getInputFile} required placeholder="Product Pic" />
                        </div>
                     </div>
                     <div className="row">
                        <div className='col'>
                           <label htmlFor="">Product pic <span className='text-danger'>*</span></label>
                           <input type="file" className="form-control" name='pic3' onChange={getInputFile} required placeholder="Product pic" />
                        </div>
                        <div className='col'>
                           <label htmlFor="">Product pic <span className='text-danger'>*</span></label>
                           <input type="file" className="form-control" name='pic4' onChange={getInputFile} required placeholder="Product pic" />
                        </div>
                     </div>

                     <div>
                        <button className='btn  mt-2 mb-3 text-light text-center w-100' onClick={postData} style={{ backgroundColor: "#183661" }}>Add Product</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </>
   );
};

export default CreateProduct;

