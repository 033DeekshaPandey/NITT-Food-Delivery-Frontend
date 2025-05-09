import "./App.css";
// import "../MainStyles.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from "./components/Signup";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./screens/MyOrder";
import AddDish from "./screens/AddDish.js";
import VendorOrders from "./screens/VendorOrders.js";

function App() {
  const userRole = localStorage.getItem("userRole");

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/createuser" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/myOrder" element={<MyOrder />} />
          <Route exact path="/addDish" element={<AddDish></AddDish>} />
          <Route exact path="/vendorOrders" element={<VendorOrders />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
