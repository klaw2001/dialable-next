import React, { Fragment, useEffect } from "react";
import ImageView from "../components/ImageView";
import { activeNavMenu, animation, niceSelect, stickyNav } from "../utils";
import Footer from "./Footer";
import Header from "./headers/Header";
import MobileMenu from "./MobileMenu";
import ScrollTop from "./ScrollTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, header }) => {
  useEffect(() => {
    animation();
    niceSelect();
    activeNavMenu();
    window.addEventListener("scroll", stickyNav);
  }, []);

  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ImageView />
      <MobileMenu />
      <Header header={header} />
      {children} <Footer />
      <ScrollTop />
    </Fragment>
  );
};
export default Layout;
