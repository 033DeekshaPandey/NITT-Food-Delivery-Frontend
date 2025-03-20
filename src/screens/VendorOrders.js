import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../App.css";

export default function VendorOrders() {
  const [orderData, setOrderData] = useState([]);
  const vendorEmail = localStorage.getItem("userEmail"); // Get vendor email

  const fetchVendorOrders = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/vendorOrders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: vendorEmail }),
    })
      .then(async (res) => {
        let response = await res.json();
        setOrderData(response.orders || []);
      })
      .catch((error) => console.log("Error fetching vendor orders:", error));
  };

  useEffect(() => {
    fetchVendorOrders();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container" style={{ minHeight: "34rem" }}>
        <div className="row">
          {orderData.length !== 0
            ? orderData.map((order) => {
                return order.order_data
                  .slice(0)
                  .reverse()
                  .map((item) => {
                    return item.map((orderDetail, index) => {
                      return (
                        <div key={index}>
                          {orderDetail.Order_date ? (
                            <div className="m-auto mt-5">
                              <strong>{orderDetail.Order_date}</strong>
                              <hr />
                            </div>
                          ) : (
                            <div className="mycard mt-3" style={{ width: "17rem", minHeight: "200px" }}>
                              <div className="card-body">
                                <h5 className="card-title">{orderDetail.name}</h5>
                                <div className="container w-100 p-0" style={{ height: "38px" }}>
                                  <span className="m-1">{orderDetail.qty}</span>
                                  <span className="m-1">{orderDetail.size}</span>
                                  <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                    ₹{orderDetail.price}/-
                                  </div>
                                  <div className="m-1">
                                    Ordered by: {orderDetail.userEmail}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    });
                  });
              })
            : <div>No orders found</div>}
        </div>
      </div>

      <Footer />
    </div>
  );
}
