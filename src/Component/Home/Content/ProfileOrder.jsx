import React, { useContext, useState } from "react";
import logo from "../../../assets/8arsa copy 2.png";
import { NavLink, useNavigate } from "react-router";
import styles from "./Content.module.css";
import { CartContext } from "../../Context/CartProvider";
import axios from "axios";

const ProfileOrder = () => {
  const { cart, setCart } = useContext(CartContext);
  const [govern, setGovern] = useState("");
  const [variables, setVariables] = useState({
    clientName: "",
    clientPhone: "",
    address: "",
  });
  const itemsCart = cart.map((one) => ({
    productId: one.id,
    quantity: one.quantity,
  }));

  const requestBody = {
    ...variables,
    items: itemsCart,
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCart([]);
    try {
      const response = await axios.post(
        "https://agricommerce.runasp.net/api/Order",
        requestBody
      );
      console.log(response.data);
      alert("Payment Successful! Thank you for your purchase.");
    } catch (err) {
      console.log("Failed to create an order");
      alert("Failed to create order. Please try again.");
    }

    navigate("/");
  };
  return (
    <div>
      <header
        style={{
          direction: "ltr",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid #eee",
          boxShadow: "2px 2px 9px -3px #333",
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            width: "170px",
          }}
        />
      </header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "700px",
        }}
      >
        <div
          style={{
            background: "#F7FAF6",
            width: "700px",
            height: "550px",
            borderRadius: "15px",
            boxShadow: "2px 2px 9px -3px #333",
          }}
        >
          <form className={styles.orderForm} onSubmit={handleSubmit}>
            <div>
              <label>الاسم بالكامل</label>
              <input
                type="text"
                required
                autoFocus
                value={variables.clientName}
                onChange={(e) =>
                  setVariables({ ...variables, clientName: e.target.value })
                }
              />
            </div>
            <div>
              <label>رقم الهاتف</label>
              <input
                type="text"
                required
                value={variables.clientPhone}
                onChange={(e) =>
                  setVariables({ ...variables, clientPhone: e.target.value })
                }
              />
            </div>
            <div>
              <label>المحافظة</label>
              <input
                type="text"
                required
                value={govern}
                onChange={(e) => setGovern(e.target.value)}
              />
            </div>
            <div>
              <label>العنوان تفصيلي</label>
              <input
                type="text"
                required
                value={variables.address}
                onChange={(e) =>
                  setVariables({ ...variables, address: e.target.value })
                }
              />
            </div>
            <button type="submit">اتمام عمليه الشراء</button>
            <NavLink to="/read/:id/cart"> الغاء </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileOrder;
