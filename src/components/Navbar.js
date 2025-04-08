import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Modal from "../Modal";
import Card from "./Card";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
import "../App.css";

export default function Navbar({ onSearch }) {
  const [cartView, setCartView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  let data = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const userRole = localStorage.getItem("userRole");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch && onSearch(query);
  };

  const handleSearchClick = () => onSearch(searchQuery);

  return (
    <div>
      <nav className="navbar navbar-expand-lg mynavbar ">
        <div className="container-fluid">
          <Link
            className="navbar-brand fs-1 fst-italic"
            style={{ color: "black" }}
            to="/"
          >
            NITFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ">
              <li className="nav-item">
                {userRole === "vendor" ? (
                  <Link
                    className="btn mx-1"
                    style={{ color: "black" }}
                    aria-current="page"
                    to="/"
                  >
                    My Dishes
                  </Link>
                ) : (
                  <Link
                    className="btn mx-1"
                    style={{ color: "black" }}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                )}
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  {userRole === "vendor" ? (
                    <Link
                      className="btn mx-1"
                      style={{ color: "black" }}
                      aria-current="page"
                      to="/myOrder"
                    >
                      Order History
                    </Link>
                  ) : (
                    <Link
                      className="btn mx-1"
                      style={{ color: "black" }}
                      aria-current="page"
                      to="/myOrder"
                    >
                      Order History
                    </Link>
                  )}
                </li>
              ) : (
                ""
              )}
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  {userRole === "vendor" ? (
                    <Link
                      className="btn mx-1"
                      style={{ color: "black" }}
                      aria-current="page"
                      to="/addDish"
                    >
                      Add Dish
                    </Link>
                  ) : (
                    ""
                  )}
                </li>
              ) : (
                ""
              )}
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="myinput d-none d-md-block me-2"
                      placeholder="Search dishes..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      style={{ maxWidth: "200px" }}
                    />
                    <button
                      className="btn btn-outline-dark"
                      onClick={handleSearchClick}
                    >
                      🔎
                    </button>
                  </div>
                </li>
              ) : null}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className="btn mx-1"
                  style={{ color: "black" }}
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn mx-1"
                  style={{ color: "black" }}
                  to="/createuser"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                {
                  <div className="d-flex align-items-center justify-content-end">
                    {userRole !== "vendor" && (
                      <div>
                        <div
                          className="btnbg-white text-success mx-2"
                          style={{ color: "black" }}
                          onClick={() => setCartView(true)}
                        >
                          <button className="mybtn">
                            My Cart {"  "}
                            <Badge pill bg="danger">
                              {data.length}
                            </Badge>
                          </button>
                        </div>
                        {cartView ? (
                          <Modal onClose={() => setCartView(false)}>
                            <Cart />
                          </Modal>
                        ) : null}
                      </div>
                    )}
                    {/* {userRole !== "vendor" && (
                      <li className="nav-item">
                        <Link className="nav-link" to="/cart">
                          <div
                            className="btnbg-white text-success mx-2"
                            style={{ color: "black" }}
                            onClick={() => setCartView(true)}
                          >
                            My Cart {"  "}
                            <Badge pill bg="danger">
                              {data.length}
                            </Badge>
                          </div>
                          {cartView ? (
                            <Modal onClose={() => setCartView(false)}>
                              <Cart />
                            </Modal>
                          ) : null}
                        </Link>
                      </li>
                    )} */}

                    <div
                      className="btnbg-white text-danger mx-2"
                      onClick={handleLogout}
                    >
                      <button className="mybtn">Logout</button>
                    </div>
                  </div>
                }
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
