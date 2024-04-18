import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);

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
                <div className="table-responsive">
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th><h4>Name</h4></th>
                                <th><h4>Contact Number</h4></th>
                                <th><h4>Order Id</h4></th>
                                <th><h4>Date</h4></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.slice().reverse().map(order => (
                                <tr key={order.orderId}>
                                    <td><h6>{order.user.username}</h6></td>
                                    <td><h6>{order.user.phone}</h6></td>
                                    <td><Link to={`/adminordersinglpage/${order.orderId}`} className='btn mb-1'>Order Id: {order.orderId}</Link></td>
                                    {/* Adjust the button placement as needed */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AdminOrder;
