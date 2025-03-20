import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function MyDishes() {
  const [foodItem, setFoodItem] = useState([]);
  const vendorEmail = localStorage.getItem("userEmail");

  const fetchVendorDishes = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/myDishes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: vendorEmail }),
      });

      const json = await response.json();
      console.log("API Response:", json);

      if (json.success && json.dishes.length > 0) {
        setFoodItem(json.dishes);
      } else {
        alert("No dishes found for this vendor");
      }
    } catch (error) {
      console.error("Error fetching vendor dishes:", error);
    }
  };

  useEffect(() => {
    fetchVendorDishes();
  }, []); 

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row mb-3">
          <div className="fs-3 m-3">My Dishes</div>
          <hr />

          {foodItem.length !== 0 ? (
            foodItem.map((dish) => (
              <div key={dish._id} className="col-12 col-md-6 col-lg-3">
                <Card foodItem={dish} options={dish.options} />
              </div>
            ))
          ) : (
            <div>No dishes found</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
