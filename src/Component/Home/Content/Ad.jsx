import React from "react";
import phone from "../../../assets/iPhone 15.png";
import styles from "./Content.module.css";
import { NavLink } from "react-router-dom";
import googleIcon from "../../../assets/unnamed.webp";
import { FaApple } from "react-icons/fa";
import circle1 from "../../../assets/Ellipse 1.png";

const Ad = () => {
  return (
    <div
      className={styles.ad}
      style={{
        direction: "ltr",
      }}
    >
      <div className={styles.adLeft}>
        <img className={styles.circle} src={circle1} />
        <img className={styles.phone} src={phone} />
      </div>
      <div className={styles.adRight}>
        <h3
          style={{
            marginTop: "-4rem",
          }}
        >
          جرب تطبيق غرسة
        </h3>
        <p>
          قم بالشراء أو البيع والعثور علي كل ما يلزم المنتجات الزراعيه من خلال
          استخدام هاتفك المحمول
        </p>
        <div
          className={styles.twoLinks}
          style={{
            marginTop: "30px",
          }}
        >
          <NavLink
            to="https://www.apple.com/eg/app-store/"
            className={styles.fLink}
          >
            <div
              style={{
                fontSize: "30px",
                color: "#000",
                marginRight: "8px",
              }}
            >
              <FaApple />
            </div>
            <p>App Store</p>
          </NavLink>
          <NavLink
            to="https://play.google.com/store/apps?hl=en&pli=1"
            className={styles.sLink}
          >
            <img src={googleIcon} alt="App Store" width="50" />
            <p
              style={{
                marginRight: "25px",
              }}
            >
              Google Play
            </p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Ad;
