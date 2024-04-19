import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const { _id } = useParams();
    // console.log(_id)
    const [consOrder, setConsOrder] = useState({
        orderid:_id
    })
console.log(consOrder)
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

    const filteredOrders = orders.filter(order => order.orderId === _id);

    const confirmOrder = async () => {
        try {
            let res = await axios.post("http://localhost:8000/api/order/confirm" ,consOrder)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

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
                                    <th>Action</th>
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
                                        <td><button className='btn btn-success' onClick={confirmOrder}>Confirm Order</button></td>
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
