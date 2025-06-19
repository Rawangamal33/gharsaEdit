import { NavLink } from "react-router-dom";
import styles from "./Content.module.css";
import { CiStar } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { boolean } from "yup";
import { FavouriteContext } from "../../Context/FavouriteProvider";

const FirstSec = ({ search }) => {
  const { favourites } = useContext(FavouriteContext);

  const filteredSearchFav = favourites.filter((fav) => {
    return fav.name.toLowerCase().trim().includes(search.toLowerCase().trim());
  });

  return (
    <div
      className={styles.firstSec}
      style={{
        direction: "ltr",
        margin: "25px 0 20px 0",
      }}
    >
      <div className={styles.favLink}>
        <p className={styles.pLink}>
          <NavLink to="/section-routes/favourite"> ‹ عرض المزيد </NavLink>
        </p>
        <p className={styles.pWord}>
          <CiStar />
          المفضلة
        </p>
      </div>
      <div className={styles.favBar}>
        {filteredSearchFav.length > 0 ? (
          filteredSearchFav.slice(0, 4).map((item) => {
            return (
              <div key={item.id} className={styles.wholeItemFav}>
                <NavLink to={`/read/${item.id}`}>
                  <img src={item.imageCover} alt={item.name} />
                </NavLink>
                <p className={styles.itemNameFav}>
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

                <div className={styles.priceIconFav}>
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
                    <span style={{ color: "#000" }}>السعر</span>:{" "}
                    {Number(item.price) - Number(item.discount)}
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
            .قم باضافة الآن منتجاتك الي المفضلة
          </p>
        )}
      </div>
    </div>
  );
};

export default FirstSec;
