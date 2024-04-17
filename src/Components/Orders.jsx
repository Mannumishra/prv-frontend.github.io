import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Product Category</th>
                                <th>Product Subcategory</th>
                                <th>Quantity</th>
                                <th>Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((order) => (
                                order.product.map((product, index) => (
                                    <tr key={index}>
                                        <td><img src={product.image} alt={product.name} style={{ height: '150px' }} /></td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.subcategory}</td>
                                        <td>{product.size}</td>
                                        <td>{product.quantity}</td>
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
