import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import PreLoader from "../src/components/PreLoader";
import "../styles/globals.css";
import Link from "next/link";
// For example, in your pages/_app.js


const MyApp = ({ Component, pageProps }) => {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, [loader]);

  return (
    <Fragment>
      <Head>
        <title>Dialable</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600&family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="shortcut icon"
          href="assets/images/favicon.ico"
          type="image/png"
        />
      </Head>
      {loader && <PreLoader />}
      <Component {...pageProps} />
    </Fragment>
  );
};
export default MyApp;
