import Link from "next/link";
import React from "react";
import PageBanner from "../src/components/PageBanner";
import TestimoinalSlider from "../src/components/Slider/TestimonialSlider";
import Layout from "../src/layouts/Layout";

const About = () => {
  return (
    <Layout>
      <a href="#main-content" className="skip-link">
        Skip to Content
      </a>
      <PageBanner title={"About us"} />

      {/*====== Start Features Section ======*/}
      <section id="main-content" className="features-area">
        <div className="features-wrapper-three pt-110">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="section-title text-center mb-60 wow fadeInUp">
                  <span className="sub-title">about us</span>
                  <h2>Welcome to Dialable </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div
                  className="features-item features-item-two text-center mb-40 wow fadeInUp"
                  data-wow-delay="10ms"
                >
                  <div className="icon">
                    <i className="flaticon-add-user" />
                  </div>
                  <div className="content">
                    <h3 className="title">User Friendly</h3>
                    <p>
                      Experience a user-friendly environment tailored for
                      effortless accessibility and seamless interaction.
                    </p>
                    <Link href="/how-work">
                      <a className="btn-link icon-btn">More Details</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div
                  className="features-item features-item-two text-center mb-40 wow fadeInDown"
                  data-wow-delay="20ms"
                >
                  <div className="icon">
                    <i className="flaticon-gift-box" />
                  </div>
                  <div className="content">
                    <h3 className="title">Marketplace Experience</h3>
                    <p>
                      Discover a personalized marketplace journey that caters to
                      your unique needs and preferences.
                    </p>
                    <Link href="/how-work">
                      <a className="btn-link icon-btn">More Details</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div
                  className="features-item features-item-two text-center mb-40 wow fadeInUp"
                  data-wow-delay="30ms"
                >
                  <div className="icon">
                    <i className="flaticon-laptop" />
                  </div>
                  <div className="content">
                    <h3 className="title">Empowering Entrepreneurship</h3>
                    <p>
                      Cultivating independence, our platform offers a stage for
                      disabled entrepreneurs to exhibit their skills, products,
                      and services
                    </p>
                    <Link href="/how-work">
                      <a className="btn-link icon-btn">More Details</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div
                  className="features-item features-item-two text-center mb-40 wow fadeInDown"
                  data-wow-delay="40ms"
                >
                  <div className="icon">
                    <i className="flaticon-headphone" />
                  </div>
                  <div className="content">
                    <h3 className="title">Unleashing Potential for Growth:</h3>
                    <p>
                      Our platform fosters economic independence and personal
                      development by creating opportunities for disabled
                      entrepreneurs.
                    </p>
                    <Link href="/how-work">
                      <a className="btn-link icon-btn">More Details</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Features Section ======*/}
      {/*====== Start Features Section ======*/}
      <section className="features-area">
        <div className="features-wrapper-four pt-80 pb-115">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="features-img wow fadeInLeft">
                  <img
                    src="https://images.unsplash.com/photo-1569937728357-4971c45997c0?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="our speciality : Image that has four people smiling "
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="features-content-box features-content-box-one">
                  <div className="section-title section-title-left mb-30 wow fadeInUp">
                    <span className="sub-title">Unlocking Potential</span>
                    <h2>Fostering Independence and Growth</h2>
                  </div>
                  <h5>
                    Our platform empowers disabled entrepreneurs by unlocking
                    their potential, fostering economic independence, and
                    facilitating personal development.
                  </h5>
                  <ul className="features-list-one">
                    <li
                      className="list-item wow fadeInUp"
                      data-wow-delay="10ms"
                    >
                      <div className="icon">
                        <i className="flaticon-find" />
                      </div>
                      <div className="content">
                        <h5>Discover What You Want</h5>
                        <p>
                          Easily find products and services that cater to your
                          unique needs, connecting you with a diverse range of
                          offerings.
                        </p>
                      </div>
                    </li>
                    <li
                      className="list-item wow fadeInUp"
                      data-wow-delay="20ms"
                    >
                      <div className="icon">
                        <i className="flaticon-place" />
                      </div>
                      <div className="content">
                        <h5>Effortlessly Choose Your Place</h5>
                        <p>
                          Seamlessly navigate through a variety of options,
                          making it simple to choose the products and services
                          that suit you best.
                        </p>
                      </div>
                    </li>
                    <li
                      className="list-item wow fadeInUp"
                      data-wow-delay="30ms"
                    >
                      <div className="icon">
                        <i className="flaticon-social-care" />
                      </div>
                      <div className="content">
                        <h5>Live Assistance Anytime, Anywhere</h5>
                        <p>
                          Enjoy live online assistance to enhance your
                          experience and ensure you receive the support you
                          need, whenever you need it.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Features Section ======*/}
      {/*====== Start CTA Section ======*/}
      <section className="cta-area">
        <div
          className="cta-wrapper-two bg_cover b"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1538947151057-dfe933d688d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div
                  className="company-name wow fadeInLeft"
                  style={{ position: "relative", right: "80px" }}
                >
                  dialable
                </div>
              </div>
              <div className="col-lg-5">
                <div className="cta-content-box wow fadeInRight">
                  <h2>Discover Extraordinary Destinations</h2>
                  <p>
                    Embark on a journey of unparalleled experiences. Our
                    platform curates unique destinations, ensuring unforgettable
                    adventures for all.
                  </p>
                  <Link href="/listing-grid">
                    <a className="main-btn icon-btn">Explore Now</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End CTA Section ======*/}
      {/*====== Start Testimonial Section ======*/}
      <section
        className="testimonial-area bg_cover pt-110 pb-265"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1613282201990-d766b5e4f32f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center mb-60 wow fadeInUp">
                <span className="sub-title">Our Testimoinals</span>
                <h2>Happy User Feedback</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="testimonial-wrapper-one text-center wow fadeInUp">
                <div className="testimonial-review-area">
                  <TestimoinalSlider />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Testimonial Section ======*/}
      {/*====== Start Newsletter Section ======*/}
      <section className="newsletter-area">
        <div className="container">
          <div
            className="newsletter-wrapper newsletter-wrapper-one bg_cover"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1585314062604-1a357de8b000?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
          >
            <div className="row">
              <div className="col-lg-5">
                <div className="newsletter-content-box-one wow fadeInLeft">
                  <div className="icon">
                    <i className="flaticon-email" />
                  </div>
                  <div className="content">
                    <h2>Get Special Rewards</h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="newsletter-form wow fadeInRight">
                  <div className="form_group">
                    <input
                      type="email"
                      className="form_control"
                      placeholder="Enter Address"
                      name="email"
                      required=""
                    />
                    <i className="ti-location-pin" />
                    <button
                      style={{ backgroundColor: "#ff344f" }}
                      className="main-btn icon-btn"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Newsletter Section ======*/}
      {/*====== Start Team Section ======*/}
      <section className="e-commerce-area pt-115 pb-85">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center mb-50 wow fadeInUp">
                <span className="sub-title">Inclusive Shopping</span>
                <h2>Unlocking Experiences</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="team-item team-item-one mb-30 wow fadeInUp">
                <div className="team-img">
                  <img
                    src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="product image 1"
                  />
                  <div className="team-social">
                    <ul className="social-link">
                      <li>
                        <a href="#">
                          <i className="ti-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ti-twitter-alt" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ti-linkedin" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ti-pinterest" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="team-info text-center">
                  <h3 className="title"></h3>
                  <span className="position"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="team-item team-item-one mb-30 wow fadeInDown"
                data-wow-delay="20ms"
              >
                <div className="team-img">
                  <img
                    src="https://images.unsplash.com/photo-1531347387918-af516d1e939c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="product image 2"
                  />
                  <div className="team-social">
                    <ul className="social-link">
                      <li>
                        <a href="#">
                          <i className="ti-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ti-twitter-alt" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ti-linkedin" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ti-pinterest" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="team-info text-center">
                  <h3 className="title"></h3>
                  <span className="position"></span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="team-item team-item-one mb-30 wow fadeInUp">
                <div className="team-img">
                  <img
                    src="https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Team Member 3"
                  />
                  <div className="team-social">
                    <ul className="social-link">
                      <li>
                        <a href="#">
                          <i className="ti-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ti-twitter-alt" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ti-linkedin" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ti-pinterest" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="team-info text-center">
                  <h3 className="title"></h3>
                  <span className="position"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*====== End Team Section ======*/}
    </Layout>
  );
};
export default About;
