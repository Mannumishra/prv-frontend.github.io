import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const { _id } = useParams();

    const getApiData = async () => {
        try {
            const res = await axios.get("https://prv-backend-github-io.onrender.com/api/order");
            setOrders(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    // Filter orders based on the _id parameter
    const filteredOrders = orders.filter(order => order.orderId === _id);

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
                {filteredOrders.map(order => (
                    <div key={order.orderId} className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Size</th>
                                    <th>Quantity</th>
                                    <th>Category</th>
                                    <th>Subcategory</th>
                                    <th>Order Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.product.map(product => (
                                    <tr key={product._id}>
                                        <td><img src={product.image} alt={product.name} className='imgs' /></td>
                                        <td>{product.name}</td>
                                        <td>{product.sizename}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.maincategory}</td>
                                        <td>{product.subcategory}</td>
                                        <td>{new Date(product.updatedAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AdminOrder;
