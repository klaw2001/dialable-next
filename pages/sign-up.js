import { useRef, useState, useEffect } from "react";
import Layout from "../src/layouts/Layout";
import PageBanner from "../src/components/PageBanner";
// import signup from '../public/assets/images/signup.svg'
import axios from "axios";
import { Container } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[A-Za-z]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const router = useRouter();
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const pwdRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();

  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidFirstName(NAME_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidLastName(NAME_REGEX.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, firstName, lastName, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = NAME_REGEX.test(firstName);
    const v3 = NAME_REGEX.test(lastName);
    const v4 = PWD_REGEX.test(pwd);

    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      
      const response = await axios.post(
        "/api/auth/signup",
        JSON.stringify({ email, firstName, lastName, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // console.log(response?.data);
      // console.log(response?.accessToken);
      // console.log(JSON.stringify(response));

      setSuccess(true);

      setEmail("");
      setFirstName("");
      setLastName("");
      setPwd("");
      // router.push('/log-in')
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email or Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <Layout>
      <PageBanner title={"Sign Up"} />
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
              <h4 className="title">Sign Up At Dialable</h4>
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
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                    />
                    <div className="form_group row row-cols-1 row-cols-md-2">
                      <div className="col">
                        <input
                          type="text"
                          id="firstname"
                          className="form_control"
                          placeholder="First Name"
                          ref={firstNameRef}
                          autoComplete="off"
                          onChange={(e) => setFirstName(e.target.value)}
                          value={firstName}
                          required
                          aria-invalid={validFirstName ? "false" : "true"}
                          aria-describedby="firstnamenote"
                          onFocus={() => setFirstNameFocus(true)}
                          onBlur={() => setFirstNameFocus(false)}
                        />
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          id="lastname"
                          className="form_control"
                          placeholder="Last Name"
                          ref={lastNameRef}
                          autoComplete="off"
                          onChange={(e) => setLastName(e.target.value)}
                          value={lastName}
                          required
                          aria-invalid={validLastName ? "false" : "true"}
                          aria-describedby="lastnamenote"
                          onFocus={() => setLastNameFocus(true)}
                          onBlur={() => setLastNameFocus(false)}
                        />
                      </div>
                    </div>

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
                          onFocus={() => setPwdFocus(true)}
                          onBlur={() => setPwdFocus(false)}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <p
                        id="pwdnote"
                        className={
                          pwdFocus && !validPwd ? "instructions" : "offscreen"
                        }
                      >
                        8 to 24 characters.
                        <br />
                        Must include uppercase and lowercase letters, a number
                        and a special character.
                        <br />
                        Allowed special characters:{" "}
                        <span aria-label="exclamation mark">!</span>{" "}
                        <span aria-label="at symbol">@</span>{" "}
                        <span aria-label="hashtag">#</span>{" "}
                        <span aria-label="dollar sign">$</span>{" "}
                        <span aria-label="percent">%</span>
                      </p>
                    </div>

                    <button
                      className="main-btn icon-btn"
                      type="submit"
                      disabled={
                        !validEmail ||
                        !validFirstName ||
                        !validLastName ||
                        !validPwd
                      }
                    >
                      Sign Up
                    </button>
                  </form>
                  <div className="d-flex mt-3" style={{gap:'20px'}}>
                    <p>Already registered?</p>
                    <p className="line">
                      <Link href="/log-in" className="text-decoration-underline text-danger">Sign In</Link>
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

export default Register;
