import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../App.css";

export default function MyOrder() {
  const [orderData, setOrderData] = useState("");

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/myOrderData`, {
      // credentials: 'include',
      // Origin:`${process.env.REACT_APP_FRONTEND_URL}/login`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();

      await setOrderData(response);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container" style={{ minHeight: "34rem" }}>
        <div className="row">
          {Object.keys(orderData).length !== 0
            ? Array(orderData).map((data) => {
                //console.log(data);
                return data.orderData
                  ? data.orderData.order_data
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return item.map((arrayData) => {
                          return (
                            <div>
                              {arrayData.Order_date ? (
                                <div className="m-auto mt-5">
                                  {(data = arrayData.Order_date)}
                                  <hr />
                                </div>
                              ) : (
                                <div className="">
                                  <div
                                    className="mycard mt-3"
                                    style={{
                                      width: "17rem",
                                      minHeight: "200px",
                                    }}
                                  >
                                    {/* <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                    <div className="card-body">
                                      <h5 className="card-title">
                                        {arrayData.name}
                                      </h5>
                                      <div
                                        className="container w-100 p-0"
                                        style={{ height: "38px" }}
                                      >
                                        <span className="m-1">
                                          {arrayData.qty}
                                        </span>
                                        <span className="m-1">
                                          {arrayData.size}
                                        </span>
                                        <div className="m-1">{data}</div>
                                        <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                          ₹{arrayData.price}/-
                                        </div>
                                        <div className="m-1 ">
                                          the order is made through{" "}
                                          {arrayData.userEmail} id
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        });
                      })
                  : "";
              })
            : ""}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
