import { useEffect, useState } from "react";
import styles from "./Content.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { boolean } from "yup";

// eslint-disable-next-line react/prop-types
const Favourite = ({ search }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavourites);
  }, []);

  const handleDeleteFav = (item) => {
    const remainingItems = filteredSearchFav.filter((fav) => {
      return fav.id !== item.id;
    });
    alert("Item deleted");
    setFavourites(remainingItems);
    localStorage.setItem("favourites", JSON.stringify(remainingItems));
  };

  const filteredSearchFav = favourites.filter((fav) => {
    // eslint-disable-next-line react/prop-types
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
                <img src={item.imageCover} alt={item.name} />
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
                    <FaStar
                      style={{
                        marginRight: "7px",
                        color: "gold",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeleteFav(item)}
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
