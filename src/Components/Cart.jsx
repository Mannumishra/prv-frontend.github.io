import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
    const UserString = sessionStorage.getItem('user');
    const User = JSON.parse(UserString);
    const [cartItems, setCartItems] = useState([]);

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

    const postData = async () => {
        try {
            const userid = User._id;
            const details = {
                userid: userid,
                cartItems: cartItems
            };
            console.log("Request Payload", details);

            const token = localStorage.getItem('token');
            const res = await axios.post("https://prv-backend-github-io.onrender.com/api/order", details, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Response", res);

            if (res.status === 200) {
                toast.success("Order placed successfully");
                setCartItems([]); // Empty the cart
                sessionStorage.removeItem("cartItems"); // Remove items from session storage
            } else {
                toast.error("Failed to place order");
            }
        } catch (error) {
            console.error("Error while placing order:", error);
            toast.error("Error while placing order");
        }
    };

    return (

       <>
       
        <div className="container p-4">
            <h2 className='mb-3'>Cart Items <span className='float-end'><Link to="/singlepage" className='btn btn-success float-right'>Shop Now </Link></span></h2>
            <div className="table-responsive">
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>SubCategory</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.slice().reverse().map((item, index) => ( // Reversing the order of displayed cart items
                            <tr key={index}>
                                <td><img src={item.image} alt="" style={{ height: "100px" }} /></td>
                                <td>{item.name}</td>
                                <td>{item.maincategory}</td>
                                <td>{item.subcategory}</td>
                                <td>{item.sizename}</td>
                                <td>{item.quantity}</td>
                                <td><button className='btn btn-danger' onClick={() => deleteFromCart(index)}>Remove </button></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={2}><button className='btn btn-primary ' onClick={postData}>Place Order</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-3">
                <Link to="/orders" className='btn btn-success float-end'>See Order Details </Link>
            </div>
        </div>
       </>
    );
}

export default Cart;
