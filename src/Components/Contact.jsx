import React, { useState } from 'react'

const Contact = () => {
   const [data, setData] = useState({
      name: "",
      email: "",
      address: "",
      phone: "",
      message: ""
   })

   const getinputData = (e) => {
      const { name, value } = e.target
      setData({ ...data, [name]: value })
   }
   // console.log(data);
   const postData = async (e) => {
      e.preventDefault()
      let response = await fetch("https://prv-backend-github-io.onrender.com/api/contact", {
         method: "post",
         headers: {
            "content-type": "application/json"
         },
         body: JSON.stringify(data)
      })
      response = await response.json()
      console.log(response);
   }
   return (
      <>
         {/* <!-- banner --> */}
         <div className="blue_bg">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <div className="titlepage">
                        <h2 className='text-center mt-5'>Contact Us For any Query</h2>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* <!-- contact section --> */}
         {/* <div id="contact"> */}
         <div >
            <div className="container">
               <div className="row mt-5">
                  {/* <div className="col-12"> */}
                  {/* <div className="row gy-4"> */}
                  <div className="col-md-4">
                     <div className="bg-light d-flex flex-column justify-content-center p-4">
                        <h5 className="text-uppercase">// Address //</h5>
                        <p className="m-0"><i className="fa fa-home text-primary me-2"></i>A-43, Sector 16, Noida, India</p>
                     </div>
                  </div>
                  <div className="col-md-4">
                     <div className="bg-light d-flex flex-column justify-content-center p-4">
                        <h5 className="text-uppercase">// Email //</h5>
                        <p className="m-0"><i className="fa fa-envelope-open text-primary me-2"></i><a href="mailto:vishankchauhan@gmail.com" className='text-dark'>vishankchauhan@gmail.com</a></p>
                     </div>
                  </div>
                  <div className="col-md-4">
                     <div className="bg-light d-flex flex-column justify-content-center p-4">
                        <h5 className="text-uppercase">// Phone //</h5>
                        <p className="m-0"><i className="fa fa-phone text-primary me-2"></i><a href="tel:+919873848046" className='text-dark'>+91-9873848046</a></p>
                     </div>
                  </div>
                  {/* </div> */}
                  {/* </div> */}
               </div>
               <div className="row mt-5">


                  <div className="col-md-6">
                     <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height="500px" id="gmap_canvas" src="https://maps.google.com/maps?q=a-43%20Noida%20Sector%2016&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div></div>

                  </div>
                  <div className="col-md-6 ">
                     <form onSubmit={postData} className="">
                        <div className="row">
                           <div className='mb-3'>
                              <input className="form-control" placeholder="Name" type="text" onChange={getinputData} name="name" required />
                           </div>
                           <div className="mb-3">
                              <input className="form-control" placeholder="Phone Number" type="text" onChange={getinputData} name="phone" required />
                           </div>
                           <div className="mb-3">
                              <input className="form-control" placeholder="Email" type="text" onChange={getinputData} name="email" required />
                           </div>
                           <div className="mb-3">
                              <input className="form-control" placeholder="Address" type="text" onChange={getinputData} name="address" required />
                           </div>
                           <div className="mb-3">
                              <input className="form-control" placeholder="Message" type="text" onChange={getinputData} name="message" required />
                           </div>
                           <div className="col-md-12">
                              <button className="btn btn-dark w-100">Send</button>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
               {/* </div> */}
            </div>
         </div>
         {/* </div> */}
         {/* <!-- end contact section --> */}
      </>
   )
}

export default Contact