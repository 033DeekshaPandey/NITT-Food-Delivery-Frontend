import "../MainStyles.css";
import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  //console.log(props);
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [cookname, setcookname] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editedDish, setEditedDish] = useState({
    name: props.foodItem.name,
    category: props.foodItem.category,
    description: props.foodItem.description,
    availability: props.foodItem.availability,
    options: props.foodItem.options,
    oilType: props.foodItem.oilType,
    calories: props.foodItem.calories,
  });

  const loadData = async () => {
    let email = props.foodItem.email;
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/getuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    const json = await response.json();
    setcookname(json.name);
    if (!json.success) {
      alert(json.errors);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/updateDish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: props.foodItem._id,
            ...editedDish,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setIsEditing(false);
        window.location.reload(); // or trigger parent to refresh the list
      } else {
        alert("Failed to update dish.");
      }
    } catch (error) {
      console.error("Error updating dish:", error);
    }
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this dish?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/deleteDish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: props.foodItem._id }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Dish deleted successfully.");
        window.location.reload(); // Or refetch the data from the parent
      } else {
        alert("Failed to delete dish.");
      }
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          email: props.foodItem.email,
        });
        return;
      } //console.log(data)
      return;
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      email: props.foodItem.email,
    });
  };
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);

  const userRole = localStorage.getItem("userRole");

  return (
    <div className="card-container" style={{ margin: "10px" }}>
      {/* <div style={{ width: "17rem", maxHeight: "500px" }}> */}
      <div className="w-100" style={{ maxHeight: "500px" }}>
      <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          {isEditing ? (
            <>
              Name of Dish:{" "}
              <input
                type="text"
                className="card-input mb-2"
                value={editedDish.name}
                onChange={(e) =>
                  setEditedDish({ ...editedDish, name: e.target.value })
                }
              />
              <br />
              Description:{" "}
              <input
                type="text"
                className="card-input mb-2"
                value={editedDish.description}
                onChange={(e) =>
                  setEditedDish({
                    ...editedDish,
                    description: e.target.value,
                  })
                }
              />
              Availability:{" "}
              <input
                type="text"
                className="card-input mb-2"
                placeholder="Enter availability time"
                value={editedDish.availability}
                onChange={(e) =>
                  setEditedDish({
                    ...editedDish,
                    availability: e.target.value,
                  })
                }
              />
              Half:{" "}
              <input
                type="number"
                className="card-input mb-2"
                value={editedDish.options.half}
                placeholder="Price for half"
                onChange={(e) =>
                  setEditedDish({
                    ...editedDish,
                    options: { ...editedDish.options, half: e.target.value },
                  })
                }
              />
              Full:{" "}
              <input
                type="number"
                className="card-input mb-2"
                value={editedDish.options.full}
                placeholder="Price for full"
                onChange={(e) =>
                  setEditedDish({
                    ...editedDish,
                    options: { ...editedDish.options, full: e.target.value },
                  })
                }
              />
              <div className="d-flex justify-content-end">
                <button
                  onClick={handleSaveClick}
                  className="btn btn-success me-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h5 className="card-title">{props.foodItem.name}</h5>
              <div>Cookname : {cookname}</div>
              <div>{props.foodItem.description}</div>
              <div>Type of Oil Used : {props.foodItem.oilType}</div>
              <div>Calories : {props.foodItem.calories}</div>
              <div>Availability : {props.foodItem.availability}</div>
              {userRole === "user" ? (
                <>
                  <div className="card-container w-100">
                    <select
                      className=" card-select m-2 h-100 rounded"
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {Array.from(Array(6), (e, i) => {
                        return (
                          <option key={i + 1} value={i + 1}>
                            {" "}
                            {i + 1}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className="myselect m-2 h-100 rounded"
                      ref={priceRef}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      {priceOptions.map((data) => {
                        return (
                          <option key={data} value={data}>
                            {data}
                          </option>
                        );
                      })}
                    </select>
                    <div className="d-inline h-100 fs-5">
                      Rs. {finalPrice}/-
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>Half : Rs. {props.foodItem.options.half}</div>
                  <div>Full : Rs. {props.foodItem.options.full}</div>
                </>
              )}
            </>
          )}
        </div>
        {userRole === "vendor" ? (
          <div className="d-flex justify-center mt-2">
            <button className="m-2 card-btn" onClick={handleEditClick}>
              Edit ✏️
            </button>
            <button className="m-2 card-btn" onClick={handleDeleteClick}>
              Delete 🗑️
            </button>
          </div>
        ) : (
          localStorage.getItem("authToken") && (
              <button className="justify-center ms-2 card-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
          )
        )}

        <hr></hr>
      </div>
    </div>
  );
}
