import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Carousal from "../components/Carousal";
import Card from "../components/Card";
import Footer from "../components/Footer";
import "../MainStyles.css";

export default function Home({ onSearch }) {
  const [search, setsearch] = useState("");
  const [foodCat, setfoodcat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch && onSearch(query);
  };

  const handleSearchClick = () => setsearch(searchQuery);

  const loadData = async () => {
    try {
      let response;

      if (userRole === "vendor") {
        response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/myDishes`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userEmail }),
          }
        );
        const data = await response.json();
        setfoodItem(data[0] || []);
        setfoodcat(data[1] || []);
      } else {
        response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/foodData`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setfoodItem(data[0] || []);
        setfoodcat(data[1] || []);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleSearch = (query) => {
    setsearch(query);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />{" "}
      </div>
      <div className="main-content">
        {localStorage.getItem("authToken") ? (
          <div className="left-section">
            <div className="searchbar d-flex align-items-center">
              <input
                type="text"
                className="myinput d-none d-md-block me-2"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                className="btn btn-outline-dark"
                onClick={handleSearchClick}
              >
                🔎
              </button>
            </div>
          </div>
        ) : null}
        <div className="right-section">
          <div className="home-container">
            {foodCat.length !== 0
              ? foodCat.map((data) => {
                  return (
                    <div key={data._id} className="row mb-3">
                      <strong>
                        <div className="fs-3 m-3">{data.CategoryName}</div>
                      </strong>
                      <hr />
                      {foodItem.length !== 0 ? (
                        foodItem
                          .filter(
                            (item) =>
                              item.CategoryName === data.CategoryName &&
                              item.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                          )
                          .map((item) => {
                            return (
                              <div key={item._id} className="card-wrapper">
                                <Card foodItem={item} options={item.options} />
                              </div>
                            );
                          })
                      ) : (
                        <div>No such data found</div>
                      )}
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
      <div>
        {" "}
        <Footer />{" "}
      </div>
    </div>
  );
}
