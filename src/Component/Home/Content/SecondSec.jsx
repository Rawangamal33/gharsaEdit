import { useEffect, useState } from "react";
import styles from "./Content.module.css";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { boolean } from "yup";

const SecondSec = ({ data, search }) => {
  const filteredData = data.filter((item) => {
    return item.discount === 0.0;
  });
  const filteredSearchMost = filteredData.filter((most) => {
    return most.name.toLowerCase().trim().includes(search.toLowerCase().trim());
  });
  return (
    <div
      className={styles.secondSec}
      style={{
        direction: "ltr",
        margin: "25px 0 20px 0",
      }}
    >
      <div className={styles.mostLink}>
        <p className={styles.pLink}>
          <NavLink to="/section-routes/mostSell"> ‹ عرض المزيد </NavLink>
        </p>
        <p className={styles.pWord}>الأكثر مبيعا</p>
      </div>
      <div className={styles.mostBar}>
        {filteredSearchMost.length > 0 ? (
          filteredSearchMost.slice(0, 4).map((item) => {
            return (
              <div key={item.id} className={styles.wholeItemMost}>
                <img src={item.imageCover} alt={item.name} />
                <p className={styles.itemNameMost}>
                  <NavLink
                    to={`/read/${item.id}`}
                    style={{
                      textDecoration: "none",
                      color: "#6BB05F",
                    }}
                  >
                    {item.name}
                  </NavLink>
                </p>

                <div className={styles.priceIconMost}>
                  <p
                    style={
                      !boolean(item.isActive)
                        ? {
                            textDecoration: "line-through",
                            textDecorationColor: "red",
                          }
                        : null
                    }
                  >
                    متاح الان <FaShoppingCart />
                  </p>
                  <p>
                    <span style={{ color: "#000" }}>السعر</span>: {item.price}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p
            style={{
              color: "#6BB05F",
              fontSize: "1.5rem",
              fontWeight: "500",
            }}
          >
            .لا توجد منتجات متاحة
          </p>
        )}
      </div>
    </div>
  );
};

export default SecondSec;
