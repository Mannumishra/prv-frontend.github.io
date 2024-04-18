import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';


const SinglePageProduct = () => {
    const { _id } = useParams();
    const [product, setProduct] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [allSubcategory, setAllSubcategory] = useState([]);
    const [cate, setCate] = useState();
    const [subcate, setSubcate] = useState();
    const [quantities, setQuantities] = useState(JSON.parse(localStorage.getItem('quantities')) || {});

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

    useEffect(() => {
        getApiDataCategory();
        getApiDataSubCategory();
    }, []);

    useEffect(() => {
        getAPIData();
    }, []);

    useEffect(() => {
        localStorage.setItem('quantities', JSON.stringify(quantities));
    }, [quantities]);

    const handleChangeQuantity = (productId, quantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: quantity
        }));
    };

    const getAPIData = async () => {
        try {
            let res = await axios.get("https://prv-backend-github-io.onrender.com/api/product");
            setProduct(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handlleCategory = (e) => {
        setCate(e.target.value);
    };

    const handlleSubCategory = (e) => {
        setSubcate(e.target.value);
    };

    const userid = sessionStorage.getItem("userid");

    const addtoCart = async (productId, name, image, quantity, sizename, color, stock, maincategory, subcategory) => {
        // Create an object for the product
        const productData = {
            productId: productId,
            name: name,
            image: image,
            quantity: quantity,
            sizename: sizename,
            color: color,
            stock: stock,
            maincategory: maincategory,
            subcategory: subcategory
        };

        // Retrieve the existing cart items from sessionStorage
        let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

        // Check if the product is already in the cart
        const existingProductIndex = cartItems.findIndex(item => item.productId === productId);

        if (existingProductIndex !== -1) {
            // If the product is already in the cart, update its quantity
            cartItems[existingProductIndex].quantity += quantity;
        } else {
            // If the product is not in the cart, add it to the cart items
            cartItems.push(productData);
            toast.success(`Product added to cart`);
        }
        // Save the updated cart items back to sessionStorage
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.removeItem('quantities', JSON.stringify(quantities));
        // Optional: You can display a message or perform any other action after adding the product to the cart
    };

    return (
        <>
            <div className="blue_bg mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="titlepage">
                                <h2 className='text-center mb-5'>Product Details</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <div >
                            <ul className="list-group">
                                <Link to='/singlepage'><li className="list-group-item mb-2">Product <span className='fa fa-list float-end'></span></li></Link>
                                <Link to='/orders'><li className="list-group-item">Orders <span className='fa fa-users float-end'></span></li></Link>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category:</label>
                            <select name="category" onChange={handlleCategory} className='form-control'>
                                <option selected disabled>Chose Category</option>
                                {
                                    allCategory.map((item, index) => {
                                        return <option key={index} value={item.name}>{item.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Sub Category :</label>
                            <select name="subcategory" onChange={handlleSubCategory} className='form-control'>
                                <option selected disabled>Chose SubCategory</option>
                                {
                                    allSubcategory.map((item, index) => {
                                        return <option key={index} value={item.name}>{item.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Product Category</th>
                                        <th>Product SubCategory</th>
                                        <th>Product Brand</th>
                                        <th>Product color</th>
                                        <th>Product Size</th>
                                        <th>Product Stock</th>
                                        <th>QTY</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.filter(item => cate ? item.category === cate : true).filter(item => subcate ? item.subcategory === subcate : true).map((item, index) =>
                                        <tr key={index}>
                                            <td><img src={item.pic1} alt="" style={{ height: 50 }} /></td>
                                            <td><h6>{item.name}</h6></td>
                                            <td><h6>{item.maincategory}</h6></td>
                                            <td><h6>{item.subcategory}</h6></td>
                                            <td><h6>{item.brand}</h6></td>
                                            <td><h6>{item.color}</h6></td>
                                            <td><h6>{item.sizename}</h6></td>
                                            <td><h6>{item.stock}</h6></td>
                                            <td>
                                                <input type="text" min="0" style={{ width: 50 }} value={quantities[item._id] || 0} onChange={(e) => handleChangeQuantity(item._id, parseInt(e.target.value))} />
                                            </td>
                                            <td className=''><button style={{ width: "100%" }} onClick={() => addtoCart(item._id, item.name, item.pic1, quantities[item._id], item.sizename, item.color, item.stock, item.maincategory, item.subcategory)} className='btn btn-success'>add</button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SinglePageProduct;
