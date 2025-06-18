import { NavLink } from "react-router-dom";
import logo from "../../../assets/8arsa copy 3 (1).png";
import styles from "./Nav.module.css";
import { CiSearch } from "react-icons/ci";
import { FaCartPlus } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../../Context/CartProvider";
import { MdAccountCircle } from "react-icons/md";

const Nav = ({ search, setSearch }) => {
  const { cart } = useContext(CartContext);
  return (
    <div
      className={styles.navBar}
      style={{
        direction: "ltr",
      }}
    >
      <img src={logo} alt="logo" />

      <NavLink
        style={{
          position: "relative",
        }}
        to="/read/:id/cart"
      >
        <FaCartPlus
          style={{
            position: "absolute",
            top: "32px",
            left: "-50px",
            fontSize: "2.1rem",
            color: "#6BB05F",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "42px",
            fontSize: "12px",
            left: "-23px",
            color: "#fff",
            background: "red",
            padding: "0 5px",
            borderRadius: "9px",
          }}
        >
          {cart.length}
        </span>
      </NavLink>

      <ul>
        <li>
          <NavLink to="/aboutUs">من نحن</NavLink>
        </li>
        <li>
          <NavLink to="/contactUs">تواصل معنا</NavLink>
        </li>
        <li>
          <NavLink to="/">الصفحة الرئيسية</NavLink>
        </li>
      </ul>
      <div className={styles.inputIcon}>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">
          <CiSearch />
        </button>
      </div>
      <div
        style={{
          fontSize: "50px",
          margin: "5px -19px 0 19px",
          color: "#6BB05F",
          cursor: "pointer",
        }}
      >
        <NavLink to="/admin">
          <MdAccountCircle />
        </NavLink>
      </div>
      <NavLink className={styles.login} to="/loginIn">
        تسجيل دخول
      </NavLink>
    </div>
  );
};
export default Nav;
