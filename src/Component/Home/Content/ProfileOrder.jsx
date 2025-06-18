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
  const [errors, setErrors] = useState({
    clientName: "",
    clientPhone: "",
    govern: "",
    address: "",
  });

  // Regular expressions for validation
  const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]+$/; // Allows both English and Arabic letters
  const phoneRegex = /^01[0125][0-9]{8}$/; // Egyptian phone numbers
  const addressRegex = /^[a-zA-Z0-9\u0600-\u06FF\s\-.,]+$/; // Allows English, Arabic, numbers, and common address characters

  const itemsCart = cart.map((one) => ({
    productId: one.id,
    quantity: one.quantity,
  }));

  const requestBody = {
    ...variables,
    items: itemsCart,
  };
  const navigate = useNavigate();

  const validateInputs = () => {
    let valid = true;
    const newErrors = {
      clientName: "",
      clientPhone: "",
      govern: "",
      address: "",
    };

    if (!variables.clientName.trim()) {
      newErrors.clientName = "الاسم مطلوب";
      valid = false;
    } else if (!nameRegex.test(variables.clientName)) {
      newErrors.clientName = "الاسم يحتوي على حروف غير مسموح بها";
      valid = false;
    }

    if (!variables.clientPhone.trim()) {
      newErrors.clientPhone = "رقم الهاتف مطلوب";
      valid = false;
    } else if (!phoneRegex.test(variables.clientPhone)) {
      newErrors.clientPhone = "رقم الهاتف يجب أن يكون رقم مصري صحيح (11 رقم)";
      valid = false;
    }

    if (!govern.trim()) {
      newErrors.govern = "المحافظة مطلوبة";
      valid = false;
    }

    if (!variables.address.trim()) {
      newErrors.address = "العنوان مطلوب";
      valid = false;
    } else if (!addressRegex.test(variables.address)) {
      newErrors.address = "العنوان يحتوي على حروف غير مسموح بها";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    setCart([]);
    try {
      const response = await axios.post(
        "https://agricommerce.runasp.net/api/Order",
        requestBody
      );
      console.log(response.data);
      alert("تم الدفع بنجاح! شكراً لشرائك.");
      navigate("/");
    } catch (err) {
      console.log("Failed to create an order");
      alert("فشل في إنشاء الطلب. يرجى المحاولة مرة أخرى.");
    }
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
              {errors.clientName && (
                <span style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.clientName}
                </span>
              )}
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
              {errors.clientPhone && (
                <span style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.clientPhone}
                </span>
              )}
            </div>
            <div>
              <label>المحافظة</label>
              <input
                type="text"
                required
                value={govern}
                onChange={(e) => setGovern(e.target.value)}
              />
              {errors.govern && (
                <span style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.govern}
                </span>
              )}
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
              {errors.address && (
                <span style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.address}
                </span>
              )}
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
