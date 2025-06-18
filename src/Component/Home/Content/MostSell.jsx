import { useMemo } from "react";
import styles from "./Content.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { boolean } from "yup";

const MostSell = ({ data, search, loading, fetchError }) => {
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return item.discount === 0.0;
    });
  }, [data]);

  const filteredSearchMost = useMemo(() => {
    return filteredData.filter((item) => {
      return item.name
        .toLowerCase()
        .trim()
        .includes(search.toLowerCase().trim());
    });
  }, [search, filteredData]);

  const handleFavourite = (item) => {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (!favourites.some((fav) => fav.id === item.id)) {
      favourites.push(item);
      alert("Item added to favourites ⭐");
    } else {
      favourites = favourites.filter((one) => {
        return one.id !== item.id;
      });
      alert("Item deleted from favourites ⭐");
    }
    localStorage.setItem("favourites", JSON.stringify(favourites));
  };

  return (
    <div
      className={styles.secondSec}
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
          الأكثر مبيعا
        </h1>
      </div>

      {fetchError ? (
        <p
          style={{
            color: "red",
            fontSize: "3rem",
            textAlign: "center",
          }}
        >
          Failed to load data. Please check your connection and try again.
          <button
            style={{
              display: "block",
              marginInline: "auto",
              fontSize: "2rem",
              padding: "8px",
              color: "white",
              background: "#6BB05F",
              borderRadius: "15px",
              border: "1px solid #eee",
            }}
            onClick={() => location.reload()}
          >
            retry
          </button>
        </p>
      ) : loading ? (
        <p
          style={{
            color: "#6BB05F",
            fontSize: "3.5rem",
          }}
        >
          Loading
        </p>
      ) : (
        <div className={styles.mostBar}>
          {filteredSearchMost.length > 0 ? (
            filteredSearchMost.map((item) => {
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
                      <FaStar
                        style={{
                          marginRight: "5px",
                          color: "gold",
                          cursor: "pointer",
                        }}
                        onClick={() => handleFavourite(item)}
                      />
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
      )}
    </div>
  );
};

export default MostSell;
