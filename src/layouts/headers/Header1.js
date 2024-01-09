import Link from "next/link";
import React, { useEffect, useState } from "react";
import { About, Blog, Contact, Home, Listing, Pages, Profile } from "../Menu";
import axios from "axios";

const Header1 = () => {
  const [user, setUser] = useState({});
  const [loggedin , setLoggedIn] = useState(false)
  useEffect(() => {
    const userID = localStorage.getItem("userID");
    axios
      .get(`/api/auth/get-current-user/${userID}`)
      .then((res) => {
        const userData = res.data?.user;
        setUser(userData);
        setLoggedIn(true)
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <header className="header-area header-area-one d-none d-xl-block">
      <div className="header-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="top-social">
                <ul className="social-link">
                  <li>
                    <span>Follow us:</span>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ti-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ti-twitter-alt"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ti-pinterest"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ti-dribbble"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ti-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="top-content text-center">
                <p>
                  We Have Special Offers Every{" "}
                  <Link href="/">
                    <a>Find your offer</a>
                  </Link>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="top-right">
                <ul className="d-flex">
                  <li>
                    <Link href="/">
                      <a>
                        <i className="ti-search"></i>
                        <span>Search here</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>
                        <i className="ti-heart"></i>
                        <span>Wishlist</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a>
                        <i className="ti-shopping-cart"></i>
                        <span>Cart</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-navigation">
        <div className="container-fluid">
          <div className="primary-menu">
            <div className="row">
              <div className="col-lg-2 col-5">
                <div className="site-branding">
                  <Link href="/">
                    <a className="brand-logo">
                      <img
                        src="http://res.cloudinary.com/dqpj1vyjn/image/upload/v1704696575/jh8xzhfpc4vtgtpfg7fi.jpg"
                        alt="Brand Logo"
                      />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 col-2">
                <div className="nav-menu">
                  <div className="navbar-close">
                    <i className="ti-close"></i>
                  </div>
                  <nav className="main-menu">
                    <ul>
                      <li className="menu-item">
                        <Link href="/">
                          <a>Home</a>
                        </Link>
                        {/* <ul className="sub-menu">
                          <Home />
                        </ul> */}
                      </li>
                      <About />
                      <li className="menu-item has-children">
                        <a href="#">Listings</a>
                        <ul className="sub-menu">
                          <Listing />
                        </ul>
                      </li>
                      <li className="menu-item has-children">
                        <a href="#">Pages</a>
                        <ul className="sub-menu">
                          <Pages />
                        </ul>
                      </li>
                      <li className="menu-item has-children">
                        <a href="#">Article</a>
                        <ul className="sub-menu">
                          <Blog />
                        </ul>
                      </li>
                      <Contact />
                      <li className="nav-btn">
                        <Link href="/add-listing">
                          <a className="main-btn icon-btn">Add Listing</a>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-lg-4 col-5">
                <div className="header-right-nav">
                  <ul className="d-flex align-items-center">
                    <li
                      className="user-btn d-flex align-items-center"
                      style={{ gap: "10px" }}
                    >
                      <div className="sub-menu">
                        <h6>
                          {loggedin ? (
                            <span>
                              Hello{" "}
                              <a href="/profile" className="text-uppercase">
                                {user.firstName}
                              </a>
                            </span>
                          ) : (
                            <a href="/log-in" className="">Login</a>
                            )}
                        </h6>
                      </div>
                      {
                        loggedin && (

                      <a href="/profile" className="icon">
                        <i className="flaticon-avatar"></i>
                      </a>
                        )
                      }
                    </li>
                    <li className="hero-nav-btn">
                      {loggedin ? (
                      <Link href="/add-listing">
                        <a className="main-btn icon-btn">Add Listing</a>
                      </Link>

                      ):(
                        <a href="/sign-up" className="main-btn icon-btn">Sign Up Now</a>

                      )}
                    </li>
                    <li className="nav-toggle-btn">
                      <div className="navbar-toggler">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header1;
