import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const userString = sessionStorage.getItem('user');
    const token = localStorage.getItem('token');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu open/close

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

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
           
            {/* <div className="container-fluid bg-light p-0">
            </div> */}
            <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                <Link to="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
                    <img src="/img/logo.jpg" alt="" className='logo' />
                </Link>
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarCollapse">
                    <div className="navbar-nav ms-auto p-4 p-lg-0">
                        {isAdmin && (
                            <Link className="nav-link" to="/adminhome" onClick={handleLinkClick}>Admin</Link>
                        )}

                        {isLoggedIn && !isAdmin && (
                            <>
                                <Link className="nav-link" to="/singlepage" onClick={handleLinkClick}>Product</Link>
                                <Link to="/cart" onClick={handleLinkClick}><i className='fa fa-shopping-bag text-dark fs-6 mt-4'></i></Link>
                            </>
                        )}

                        {!isLoggedIn && (
                            <>
                                <Link to="/" className="nav-item nav-link active" onClick={handleLinkClick}>Home</Link>
                                <Link to="/about" className="nav-item nav-link" onClick={handleLinkClick}>About</Link>
                                <Link to="/product" className="nav-item nav-link" onClick={handleLinkClick}>Product</Link>
                                {/* <Link to="/singlepage" className="nav-item nav-link" onClick={handleLinkClick}>Single Page</Link> */}
                                <Link to="/contact" className="nav-item nav-link" onClick={handleLinkClick}>Contact</Link>

                            </>
                        )}
                    </div>
                    <div className="">
                        {token ? (
                            <div className="search">
                                <button onClick={handleLogout} className='btn' onClick={handleLinkClick}>Logout</button>
                            </div>
                        ) : (
                            <div className="search">
                                <Link to="/login" onClick={handleLinkClick}><button className='btn'>Log In</button></Link> &nbsp;
                                {/* <Link to="/signup"><button className='btn'>Sign Up</button></Link> */}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
