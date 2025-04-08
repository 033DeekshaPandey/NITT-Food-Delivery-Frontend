import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Carousal from "../components/Carousal";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  const [search, setsearch] = useState("");
  const [foodCat, setfoodcat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");

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
        <Navbar onSearch={handleSearch} />{" "}
      </div>
      {/* <div>
        <Carousal />{" "}
      </div> */}
      {/* <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner " id="carousel">
            <div class=" carousel-caption  " style={{ zIndex: "10" }}>
              <div className=" d-flex justify-content-center">
                {" "}
                {/* <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Type in..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setsearch(e.target.value);
                  }}
                /> */}
      {/* <button className="btn text-white bg-success" type="submit">Search</button> }
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100  "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pastry"
                className="d-block w-100 "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?barbeque"
                className="d-block w-100 "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div> */}

      <div className="container">
        {foodCat.length !== 0
          ? foodCat.map((data) => {
              return (
                  <div key={data._id} className="row mb-3">
                    <div className="fs-3 m-3">{data.CategoryName}</div>
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
                            <div
                              key={item._id}
                              className="col-12 col-md-6 col-lg-3"
                            >
                              <Card
                                foodItem={item}
                                options={item.options}
                              />
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

      <div>
        {" "}
        <Footer />{" "}
      </div>
    </div>
  );
}
