import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const userString = sessionStorage.getItem('user');
    const token = localStorage.getItem('token');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = JSON.parse(userString);
        if (user && user.role === "Admin") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }

        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [userString, token]);

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <>
            {/* Topbar Start */}
            <div className="container-fluid bg-light p-0">
                {/* Topbar content */}
            </div>
            {/* Topbar End */}

            {/* Navbar Start */}
            <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                {/* Navbar Brand */}
                <Link to="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
                    <img src="/img/logo.jpg" alt="" style={{ height: 50 }} />
                </Link>

                {/* Navbar Toggler */}
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Collapse */}
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto p-4 p-lg-0">
                        {isAdmin && (
                            <Link className="nav-link" to="/adminhome">Admin</Link>
                        )}

                        {isLoggedIn && !isAdmin && (
                           <>
                            <Link className="nav-link" to="/singlepage">Product</Link>
                            <Link to="/cart"><i className='fa fa-shopping-bag text-dark fs-6 mt-4'></i></Link>
                           </>
                        )}

                        {!isLoggedIn && (
                            <>
                                <Link to="/" className="nav-item nav-link active">Home</Link>
                                <Link to="/about" className="nav-item nav-link">About</Link>
                                <Link to="/product" className="nav-item nav-link">Product</Link>
                                {/* <Link to="/singlepage" className="nav-item nav-link">Single Page</Link> */}
                                <Link to="/contact" className="nav-item nav-link">Contact</Link>
                               
                            </>
                        )}
                    </div>

                    {/* Authentication buttons */}
                    <div className="">
                        {token ? (
                            <div className="search">
                                <button onClick={handleLogout} className='btn'>Logout</button>
                            </div>
                        ) : (
                            <div className="search">
                                <Link to="/login"><button className='btn'>Log In</button></Link> &nbsp;
                                {/* <Link to="/signup"><button className='btn'>Sign Up</button></Link> */}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            {/* Navbar End */}
        </>
    );
}
