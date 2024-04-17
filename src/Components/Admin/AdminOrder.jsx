import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);

    const getApiData = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/order");
            setOrders(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    // Group orders by user
    const ordersByUser = {};
    orders.forEach(order => {
        const userId = order.user.userId;
        if (!ordersByUser[userId]) {
            ordersByUser[userId] = [];
        }
        ordersByUser[userId].push(order);
    });

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
            {orders.map(order => (
                <div key={order.orderId}>
                    <h3>User: {order.user.username}</h3>
                    <p>Contact Number: {order.user.phone}</p>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Size</th>
                                <th>Quantity</th>
                                <th>Category</th>
                                <th>Subcategory</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.product.map(product => (
                                <tr key={product._id}>
                                    <td><img src={product.image} alt={product.name} className='imgs' /></td>
                                    <td>{product.name}</td>
                                    <td>{product.size}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category}</td>
                                    <td>{product.subcategory}</td>
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
