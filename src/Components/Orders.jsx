import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Orders = () => {
    const UserString = sessionStorage.getItem('user');
    const User = JSON.parse(UserString);
    const [store, setStore] = useState([]);

    const getApiData = async () => {
        try {
            let res = await axios.get("https://prv-backend-github-io.onrender.com/api/order");
            setStore(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    let data = store.filter((x) => x.user.userId === User._id);
    data = data.slice().reverse(); // Reversing the order of displayed orders

    return (
        <>
            <div className="blue_bg mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="titlepage">
                                <h2 className='text-center mb-5'>Orders Details</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>See Order Details</th>
                                <th>Order Date</th>
                                {/* <th>Product Subcategory</th>
                                <th>Quantity</th>
                                <th>Size</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((order) => (
                                order.product.map((product, index) => (
                                    <tr key={index}>
                                        {/* <td><img src={product.image} alt={product.name} style={{ height: '150px' }} /></td> */}
                                        <td>{product._id}</td>
                                        <td><Link className='btn btn-success' to={`/singleorder/${product._id}`}>See Order Details</Link></td>
                                        <td>{new Date(product.updatedAt).toLocaleDateString()}</td>
                                        {/* <td>{product.subcategory}</td> */}
                                        {/* <td>{product.quantity}</td> */}
                                        {/* <td>{product.sizename}</td> */}
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Orders;
