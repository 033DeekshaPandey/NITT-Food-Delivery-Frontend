const express = require("express");
const router = express.Router();
const foodItem = require('../models/foodItem');

router.post("/foodData", (req, res) => {
  try {
    res.send([global.foodItems, global.foodCategory]);
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});

router.post("/myDishes", async (req, res) => {
  try {
    const vendorEmail = req.body.email;
    const vendorDishes = await foodItem.find({ email: vendorEmail });

    const categories = [...new Set(vendorDishes.map(dish => dish.CategoryName))].map(cat => ({ CategoryName: cat }));

    res.send([vendorDishes, categories]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/updateDish", async (req, res) => {
  try {
    const updatedDish = await foodItem.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          options: req.body.options,
          availability: req.body.availability,
        },
      },
      { new: true }
    );
    res.json({ success: true, updatedDish });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
});

router.post("/deleteDish", async (req, res) => {
  try {
    const { id } = req.body;
    await foodItem.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;


module.exports = router;