import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Layout from "../src/layouts/Layout";
import PageBanner from "../src/components/PageBanner";
import { Container } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

const LOGIN_URL = "/api/auth/login";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[A-Za-z]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Login = () => {
  const emailRef = useRef();
  const pwdRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = EMAIL_REGEX.test(email);
    const isValidPwd = PWD_REGEX.test(pwd);

    if (!isValidEmail || !isValidPwd) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res)=>{
        console.log(res.data.data._id)
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("userID",res.data.data._id)

        console.log(response?.data);
        console.log(response?.accessToken);
        console.log(JSON.stringify(response));
  
        setSuccess(true);
  
        setEmail("");
        setPwd("");
      });
      

    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid Email or Password");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <Layout>
      <PageBanner title={"Login"} />
      {success ? (
        <section>
          <Container>
            <div className="text-center py-5">

            <h1>Success!</h1>
            <p>
            <Link href="/log-in" className="text-decoration-underline text-danger">Sign In</Link>
            </p>
            </div>
          </Container>
        </section>
      ) : (
        <section>
          <Container>
            <div className="add-listing-form general-listing-form mb-60 wow fadeInUp">
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h4 className="title">Login At Dialable</h4>
              <div className="row">
                <div className="col-12 col-md-6 text-center text-md-start">
                  <Image
                    src="/assets/images/signup.svg"
                    alt="Description of the image"
                    layout="fill"
                    className="img-fluid"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="email"
                      className="form_control"
                      placeholder="Enter Your Email"
                      id="email"
                      ref={emailRef}
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                      aria-invalid={validEmail ? "false" : "true"}
                      aria-describedby="emailnote"
                      // onFocus={() => setEmailFocus(true)}
                      // onBlur={() => setEmailFocus(false)}
                    />
                    

                    <div className="form_group row">
                      <div className="col">
                        <input
                          type="password"
                          id="password"
                          className="form_control"
                          placeholder="Password"
                          ref={pwdRef}
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                          required
                          aria-invalid={validPwd ? "false" : "true"}
                          aria-describedby="pwdnote"
                          // onFocus={() => setPwdFocus(true)}
                          // onBlur={() => setPwdFocus(false)}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      
                    </div>

                    <button
                      className="main-btn icon-btn"
                      type="submit"
                     
                    >
                      Sign Up
                    </button>
                  </form>
                  <div className="d-flex mt-3" style={{gap:'20px'}}>
                    <p>First Time Here?</p>
                    <p className="line">
                      <Link href="/sign-up" className="text-decoration-underline text-danger">Sign Up</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}
    </Layout>
  );
};

export default Login;
