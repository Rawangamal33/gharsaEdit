import { useContext, useEffect, useState } from "react";
import styles from "./Content.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { boolean } from "yup";
import { FavouriteContext } from "../../Context/FavouriteProvider";
import { FaTrashAlt } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Favourite = ({ search }) => {
  const { favourites, handleFavourite } = useContext(FavouriteContext);

  const filteredSearchFav = favourites.filter((fav) => {
    return fav.name.toLowerCase().trim().includes(search.toLowerCase().trim());
  });

  return (
    <div
      className={styles.firstSec}
      style={{
        direction: "ltr",
      }}
    >
      <div>
        <h1
          style={{
            color: "#6BB05F",
            margin: "25px 0 25px 0",
          }}
        >
          المفضلة
        </h1>
      </div>
      <div className={styles.favBar}>
        {filteredSearchFav.length > 0 ? (
          filteredSearchFav.map((item) => {
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
                    <FaTrashAlt
                      style={{
                        marginRight: "7px",
                        color: "#BF0000",
                        cursor: "pointer",
                      }}
                      onClick={() => handleFavourite(item)}
                    />
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
            .لا توجد منتجات متاحة
          </p>
        )}
      </div>
    </div>
  );
};

export default Favourite;
