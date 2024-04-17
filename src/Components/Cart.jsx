import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const UserString = sessionStorage.getItem('user');
    const User = JSON.parse(UserString);
    const [cartItems, setCartItems] = useState([]);
    // console.log(cartItems);

    const deleteFromCart = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
        sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    useEffect(() => {
        const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    console.log(cartItems);
    const postData = async () => {
        try {
            const userid = User._id
            const details = {
                userid: userid,
                cartItems: cartItems
            }

            const token = localStorage.getItem('token');
            let res = await axios.post("http://localhost:8000/api/order", details, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res);
            sessionStorage.removeItem("cartItems")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h2>Cart Items</h2>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Product Categgory</th>
                        <th>Product Subcategory</th>
                        <th>Quantity</th>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item, index) => (
                        <tr key={index}>
                            <td><img src={item.image} alt="" style={{ height: "100px" }} /></td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.subcategory}</td>
                            <td>{item.size}</td>
                            <td>{item.quantity}</td>
                            <td>{item.color}</td>
                            <td ><button className='btn btn-danger' onClick={() => deleteFromCart(index)}>Remove </button></td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={5}><button className='btn btn-primary float-right' onClick={postData}>Place Order</button></td>
                        <td ><Link to="/singlepage" className='btn btn-success float-right'>Shop Now </Link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Cart;
