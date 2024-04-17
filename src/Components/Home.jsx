import React, { useEffect, useState } from 'react'
// import Testimonials from './Testimonials'

import { Link } from 'react-router-dom'
import About from './About'
import axios from 'axios'
export default function Home() {
    let [data, setData] = useState([])

    const getAPIData = async () => {
        try {
            let res = await axios.get("http://localhost:8000/api/product")
            console.log(res);
            setData(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <>

            {/* <!-- Carousel Start --> */}
            <div className="container-fluid p-0 mb-5">
                <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="w-100" src="img/shoes.jpg" height="500px" width="100%" alt="Image" />
                            {/* <div className="carousel-caption d-flex align-items-center"> */}
                            {/* <div className="container">
                                    <div className="row align-items-center justify-content-center justify-content-lg-start">
                                        <div className="col-10 col-lg-7 text-center text-lg-start">
                                            <h6 className="text-white text-uppercase mb-3 animated slideInDown">// Online Best Shopping Plateform //</h6>
                                            <h1 className="display-3 text-white mb-4 pb-3 animated slideInDown">Latest Tshirt,Shirts,Jeans and Many More</h1>
                                            <a href="" className="btn btn-primary py-3 px-5 animated slideInDown">Shop Now<i className="fa fa-arrow-right ms-3"></i></a>
                                        </div>
                                        <div className="col-lg-5 d-none d-lg-flex animated zoomIn">
                                            <img className="img-fluid" src="img/carousel-1.png" style={{ height: "300px", width: "100%" }} alt="" />
                                        </div>
                                    </div>
                                </div> */}
                            {/* </div> */}
                        </div>
                        <div className="carousel-item">
                            <img className="w-100" src="img/second.jpg" height="500px" width="100%" alt="Image" />
                        </div>

                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel"
                        data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#header-carousel"
                        data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            {/* <!-- Carousel End --> */}

            <About />
            {/* <!-- Product Section Start --> */}

            {/*  */}
            <div className="container mt-5">
                <div className="row mt-5 mb-3">
                    <h3 className='text-center'>Our Category Product</h3>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <img src="img/13.jpeg" alt="" style={{height:500}} />
                    </div>
                    <div className="col-md-4">
                    <img src="img/12.jpeg" alt="" style={{height:500}} />
                    </div>
                    <div className="col-md-4">
                    <img src="img/11.jpeg" alt="" style={{height:500}} />
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-xxl py-5 mt-4">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        {/* <h6 className="text-primary text-uppercase">// Best in Fashion //</h6> */}
                        <h1 className="mb-5">Our Products</h1>
                    </div>
                    <div className="row g-4">
                        {
                            data.map((item, index) => {
                                return <div key={index} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="team-item">
                                        <div className="position-relative overflow-hidden">
                                            <img className="img-fluid" src={item.pic1} style={{ height: "230px", width: "100%" }} alt="" />
                                            <div className="team-overlay position-absolute start-0 top-0 w-100 h-100">
                                                <img src={item.pic2} className='position-absolute start-0 top-0 w-100 h-100' style={{ height: "230px", width: "100%" }} alt="" />
                                                {/* <Link className="btn btn-square w-100 position-absolute start-0 bottom-0 w-100 h-100'" to={`/product/${item._id}`}><i className="fa fa-shopping-cart"></i> Add to Cart</Link> */}
                                            </div>
                                        </div>
                                        <div className="bg-light text-center p-1">
                                            <h5 className="fw-bold mb-0" style={{ height: "50px" }}>{item.name}</h5>
                                            {/* <small><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup className='text-success'>{item.discount}% Off</sup></small> */}
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            {/* <!-- Product Section End --> */}

            {/* <Testimonials /> */}
        </>
    )
}
