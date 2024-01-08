import React, { useEffect, useState } from "react";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
import Image from "next/image";
import axios from "axios";

const AddListing = () => {
  const [category, setCategory] = useState([]);
  const [user , setUser ] = useState({})
  const [formData, setFormData] = useState({
    
  });
  useEffect(() => {
    axios
      .get("/api/categories/get-categories")
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => console.log(err));
    }, []);
    console.log(category)
    
    
    useEffect(() => {
      const userID = localStorage.getItem('userID');
  
      axios.get(`/api/auth/get-current-user/${userID}`)
        .then((res) => {
          const userData = res.data.user; 
          setUser(userData);
          const initialFormData = {
            placeName: "",
            category: "",
            keywords: "",
            description: "",
            user: userData._id,
            email: "",
            phone: "",
            website: "",
            designation: "",
            company: "",
            facebook: "",
            twitter: "",
            linked: "",
            skype: "",
            name:"",
          };
          setFormData(initialFormData)
        })
        .catch((err) => console.log(err));
    }, []);
    console.log(user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await axios.post(
        "/api/listing/add-listing",
        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response?.data);
    } catch (error) {
      console.error("Error submitting listing:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        amenities: {
          ...prevData.amenities,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <Layout>
      <PageBanner title={"Add Listing"} pageName={"Listing"} />
      <section className="fioxen-add-listing pt-120 pb-120">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="add-listing-form general-listing-form mb-60 wow fadeInUp">
                  <h4 className="title">General Information</h4>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Place Name"
                          name="placeName"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <select
                          className="nice-select wide d-block"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                        >
                          <option selected disabled value="">
                            Category
                          </option>
                          {category.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Keywords"
                          name="keywords"
                          value={formData.keywords}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form_group">
                        <textarea
                          className="form_control"
                          placeholder="Description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="add-listing-form details-listing-form mb-60 wow fadeInUp">
                  <h4 className="title">Details Information</h4>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Name"
                          name="user"
                          value={user._id}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="email"
                          className="form_control"
                          placeholder="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="number"
                          className="form_control"
                          placeholder="Phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="url"
                          className="form_control"
                          placeholder="Website"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Designation"
                          name="designation"
                          value={formData.designation}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="url"
                          className="form_control"
                          placeholder="Facebook (Optional)"
                          name="facebook"
                          value={formData.facebook}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="url"
                          className="form_control"
                          placeholder="Twitter (Optional)"
                          name="twitter"
                          value={formData.twitter}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="url"
                          className="form_control"
                          placeholder="Linked (Optional)"
                          name="linked"
                          value={formData.linked}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="url"
                          className="form_control"
                          placeholder="Skype (Optional)"
                          name="skype"
                          value={formData.skype}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="add-listing-form upload-listing-form mb-60 wow fadeInUp">
                  <h4 className="title">Gallery Images</h4>
                  <p>Click here or drope files to upload</p>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form_group file-input-one">
                        <input type="file" name="Image" />
                        <div className="upload-content">
                          <div className="upload-title-icon d-flex align-items-center justify-content-center">
                            <Image
                              src="/assets/images/elements/input-1.png"
                              alt="Image"
                              width={100}
                              height={100}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form_group file-input-one">
                        <input type="file" name="Image" />
                        <div className="upload-content">
                          <div className="upload-title-icon d-flex align-items-center justify-content-center">
                            <Image
                              src="/assets/images/elements/input-1.png"
                              alt="Image"
                              width={100}
                              height={100}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form_group file-input-one">
                        <input type="file" name="Image" />
                        <div className="upload-content">
                          <div className="upload-title-icon d-flex align-items-center justify-content-center">
                            <Image
                              src="/assets/images/elements/input-1.png"
                              alt="Image"
                              width={100}
                              height={100}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form_group file-input-two">
                        <input type="file" name="Video" />
                        <div className="upload-content">
                          <div className="upload-title-icon d-flex align-items-center justify-content-center">
                            <Image
                              src="/assets/images/elements/input-2.png"
                              alt="Image"
                              width={100}
                              height={100}
                            />
                            <span>Add Video +</span>
                          </div>
                        </div>
                      </div>
                      <div className="form_group file-input-two">
                        <input type="file" name="Image" />
                        <div className="upload-content">
                          <div className="upload-title-icon d-flex align-items-center justify-content-center">
                            <Image
                              src="/assets/images/elements/input-3.png"
                              alt="Image"
                              width={100}
                              height={100}
                            />
                            <span>Add Video +</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="add-listing-form amenities-listing-form mb-60 wow fadeInUp">
                  <h4 className="title">Amenities</h4>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form_group">
                        <div className="single-checkbox d-flex">
                          <input
                            type="checkbox"
                            id="check1"
                            name="checkbox"
                            defaultChecked=""
                          />
                          <label htmlFor="check1">
                            <span>Alarm system</span>
                          </label>
                        </div>
                        <div className="single-checkbox d-flex">
                          <input type="checkbox" id="check2" name="checkbox" />
                          <label htmlFor="check2">
                            <span>Alarm system</span>
                          </label>
                        </div>
                        <div className="single-checkbox d-flex">
                          <input type="checkbox" id="check3" name="checkbox" />
                          <label htmlFor="check3">
                            <span>Alarm system</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form_group">
                        <div className="single-checkbox d-flex">
                          <input type="checkbox" id="check4" name="checkbox" />
                          <label htmlFor="check4">
                            <span>Janitor</span>
                          </label>
                        </div>
                        <div className="single-checkbox d-flex">
                          <input type="checkbox" id="check5" name="checkbox" />
                          <label htmlFor="check5">
                            <span>Onsite management</span>
                          </label>
                        </div>
                        <div className="single-checkbox d-flex">
                          <input type="checkbox" id="check6" name="checkbox" />
                          <label htmlFor="check6">
                            <span>Janitor</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form_group">
                        <div className="single-checkbox d-flex">
                          <input type="checkbox" id="check7" name="checkbox" />
                          <label htmlFor="check7">
                            <span>Depanneur in building</span>
                          </label>
                        </div>
                        <div className="single-checkbox d-flex">
                          <input type="checkbox" id="check8" name="checkbox" />
                          <label htmlFor="check8">
                            <span>Depanneur in building</span>
                          </label>
                        </div>
                        <div className="single-checkbox d-flex">
                          <input type="checkbox" id="check9" name="checkbox" />
                          <label htmlFor="check9">
                            <span>Depanneur in building</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="add-listing-form map-form mb-60 wow fadeInUp">
                  <div className="map-box">
                    <iframe src="https://maps.google.com/maps?q=new%20york&t=&z=13&ie=UTF8&iwloc=&output=embed" />
                  </div>
                </div>
                <div className="add-listing-form timing-listing-form mb-60 wow fadeInUp">
                  <h4 className="title">Opening Hours</h4>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="timeing-list">
                        <h5>
                          Monday<span className="time">08 am - 05 pm</span>
                        </h5>
                      </div>
                      <div className="timeing-list">
                        <h5>
                          Tuesday<span className="time">08 am - 05 pm</span>
                        </h5>
                      </div>
                      <div className="timeing-list">
                        <h5>
                          Wednesday<span className="time">08 am - 05 pm</span>
                        </h5>
                      </div>
                      <div className="timeing-list">
                        <h5>
                          Thursday<span className="time">08 am - 05 pm</span>
                        </h5>
                      </div>
                      <div className="timeing-list">
                        <h5>
                          Friday<span className="time">08 am - 05 pm</span>
                        </h5>
                      </div>
                      <div className="timeing-list">
                        <h5>
                          Saturday<span className="time">08 am - 05 pm</span>
                        </h5>
                      </div>
                      <div className="timeing-list">
                        <h5>
                          Saturday<span className="time">08 am - 05 pm</span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="button text-center">
                  <button className="main-btn icon-btn">Submit Listing</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};
export default AddListing;
