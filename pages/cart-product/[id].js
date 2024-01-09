import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../src/layouts/Layout";
import PageBanner from "../../src/components/PageBanner";
import { toast } from "react-toastify";

const CartPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const userID = localStorage.getItem('userID')
    axios.get(`/api/auth/get-current-user/${userID}`).then((res) => {
      setUserData(res.data.user);
      console.log(userData)
    }).catch((err)=>console.log(err))
  }, []);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, [id]),
    useEffect(() => {
      axios
        .get(`/api/cart/${id}`)
        .then((res) => {
          setCartItems(res.data.data);
        })
        .catch((err) => console.log(err));
    }, [id]);

  const numOfItems = cartItems.length;

  const formatNumberWithCommas = (number) => {
    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const totalamt = () => {
    return cartItems.reduce((total, product) => {
      return total + product.price * (product.quantity || 1);
    }, 0);
  };

  const handleIncrement = async (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);

    // Make API request to update quantity in the backend
    try {
      const cartID = updatedCart[index]._id;
      await axios.put(`/api/cart/${cartID}?updatetype=increment`);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }

    // Update localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleDecrement = async (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);

      // Make API request to update quantity in the backend
      try {
        const cartID = updatedCart[index]._id;
        await axios.put(`/api/cart/${cartID}?updatetype=decrement`);
      } catch (error) {
        console.error("Error updating quantity:", error);
      }

      // Update localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  const handleDelete = async (cartID) => {
    try {
      await axios
        .delete(`/api/cart/${cartID}`)
        .then((res) => {
          toast.success("Cart Item Deleted");
          setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item._id !== cartID)
          );
        })
        .catch((err) => {
          toast.error("Something Went Wrong");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    const res = await initializeRazorpay();
    if (!res) {
      toast.error("Razorpay SDK Failed to load");
      return;
    }

    try {
      // Make API call to the serverless API
      const response = await fetch("/api/razorpay-payment/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: totalamt() * 100, // Assuming totalamt is in rupees, convert to paise for Razorpay
        }),
      });

      const { firstName, lastName, email, contact } = userData;

      const data = await response.json();

      const options = {
        key: process.env.RAZORPAY_KEY, // Use NEXT_PUBLIC_RAZORPAY_KEY for client-side access
        name: "Dialable",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Thank you for your purchase",
        image: "http://res.cloudinary.com/dqpj1vyjn/image/upload/v1704696575/jh8xzhfpc4vtgtpfg7fi.jpg",
        handler: function (response) {
          // Validate payment at the server - using webhooks is a better idea.
          alert("Razorpay Response: " + response.razorpay_payment_id);

          clearCartItems();
          storeOrder(response.razorpay_payment_id, data.amount);
          // Additional processing or confirmation can be done here
        },
        prefill: {
            name: `${firstName} ${lastName}`, // Concatenate firstName and lastName
            email: email,
            contact: contact,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error making Razorpay payment:", error);
      toast.error("Error processing payment");
    }
  };

  const storeOrder = (paymentId, amount) => {
    const order = {
      paymentId,
      amount,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem("order", JSON.stringify(order));
  };
  return (
    <Layout>
      <PageBanner title="Cart" />
      <section class="pt-5 pb-5">
        <div class="container">
          <div class="row w-100">
            <div class="col-lg-12 col-md-12 col-12">
              <h3 class="display-5 mb-2 text-center">Shopping Cart</h3>
              <p class="mb-5 text-center">
                <i class="text-info font-weight-bold">{numOfItems}</i> items in
                your cart
              </p>
              <table
                id="shoppingCart"
                class="table table-condensed table-responsive"
              >
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((elem, index) => (
                    <tr key={elem._id}>
                      <td data-th="Product">
                        <div class="row">
                          <div class="col-md-3 text-left rounded-2">
                            <img
                              src={elem.thumbnail}
                              alt={elem.name}
                              class="img-fluid d-none d-md-block rounded-4 mb-2 shadow "
                            />
                          </div>
                          <div class="col-md-9 text-left mt-sm-2">
                            <h4>{elem.name}</h4>
                            <p class="font-weight-light">{elem.category}</p>
                          </div>
                        </div>
                      </td>
                      <td data-th="Price " style={{ fontSize: "20px" }}>
                        ₹{elem.price}
                      </td>
                      <td data-th="Quantity">
                        <div className="quantity-input">
                          <button
                            className="bg-transparent"
                            onClick={() => handleDecrement(index)}
                          >
                            <div className="quantity-down" id="quantityDown">
                              <i className="ti-minus" />
                            </div>
                          </button>
                          <input
                            id="quantity"
                            type="text"
                            name="quantity"
                            value={elem.quantity}
                          />
                          <button
                            className="bg-transparent"
                            onClick={() => handleIncrement(index)}
                          >
                            <div className="quantity-up" id="quantityUP">
                              <i className="ti-plus" />
                            </div>
                          </button>
                        </div>
                      </td>
                      <td class="actions" data-th="">
                        <div class="text-right">
                          <button class="btn btn-white border-secondary bg-white btn-md mb-2">
                            <i class="ti-reload"></i>
                          </button>
                          <button
                            class="btn btn-white border-secondary bg-white btn-md mb-2"
                            onClick={() => handleDelete(elem._id)}
                          >
                            <i class="ti-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* <tr>
                    <td data-th="Product">
                      <div class="row">
                        <div class="col-md-3 text-left">
                          <img
                            src="https://via.placeholder.com/250x250/5fa9f8/ffffff"
                            alt=""
                            class="img-fluid d-none d-md-block rounded mb-2 shadow "
                          />
                        </div>
                        <div class="col-md-9 text-left mt-sm-2">
                          <h4>Product Name</h4>
                          <p class="font-weight-light">Brand &amp; Name</p>
                        </div>
                      </div>
                    </td>
                    <td data-th="Price">$49.00</td>
                    <td data-th="Quantity">
                      <input
                        type="number"
                        class="form-control form-control-lg text-center"
                        value="1"
                      />
                    </td>
                    <td class="actions" data-th="">
                      <div class="text-right">
                        <button class="btn btn-white border-secondary bg-white btn-md mb-2">
                          <i class="fas fa-sync"></i>
                        </button>
                        <button class="btn btn-white border-secondary bg-white btn-md mb-2">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td data-th="Product">
                      <div class="row">
                        <div class="col-md-3 text-left">
                          <img
                            src="https://via.placeholder.com/250x250/5fa9f8/ffffff"
                            alt=""
                            class="img-fluid d-none d-md-block rounded mb-2 shadow "
                          />
                        </div>
                        <div class="col-md-9 text-left mt-sm-2">
                          <h4>Product Name</h4>
                          <p class="font-weight-light">Brand &amp; Name</p>
                        </div>
                      </div>
                    </td>
                    <td data-th="Price">$49.00</td>
                    <td data-th="Quantity">
                      <input
                        type="number"
                        class="form-control form-control-lg text-center"
                        value="1"
                      />
                    </td>
                    <td class="actions" data-th="">
                      <div class="text-right">
                        <button class="btn btn-white border-secondary bg-white btn-md mb-2">
                          <i class="fas fa-sync"></i>
                        </button>
                        <button class="btn btn-white border-secondary bg-white btn-md mb-2">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr> */}
                </tbody>
              </table>
              <div class="float-right text-right">
                <h3>Subtotal : ₹{formatNumberWithCommas(totalamt())}</h3>
              </div>
            </div>
          </div>
          <div class="row mt-4 d-flex align-items-center">
            <div class="col-sm-6 order-md-2 text-right">
              <button class="main-btn" onClick={makePayment}>
                Checkout
              </button>
            </div>
            <div class="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
              <a href="catalog.html">
                <i class="ti-arrow-left mr-2"></i>Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CartPage;
