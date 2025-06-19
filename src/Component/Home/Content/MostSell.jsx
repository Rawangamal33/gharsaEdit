import { useContext, useMemo } from "react";
import styles from "./Content.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { boolean } from "yup";
import { use } from "react";
import { FavouriteContext } from "../../Context/FavouriteProvider";
import { FaTrashAlt } from "react-icons/fa";

const MostSell = ({ data, search, loading, fetchError }) => {
  const { favourites, handleFavourite } = useContext(FavouriteContext);

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
              const isFav = favourites.some((fav) => fav.id === item.id);
              return (
                <div key={item.id} className={styles.wholeItemMost}>
                  <NavLink to={`/read/${item.id}`}>
                    <img src={item.imageCover} alt={item.name} />
                  </NavLink>
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
                      {isFav ? (
                        <FaTrashAlt
                          style={{
                            marginRight: "5px",
                            color: "#BF0000",
                            cursor: "pointer",
                          }}
                          onClick={() => handleFavourite(item)}
                        />
                      ) : (
                        <FaStar
                          style={{
                            marginRight: "5px",
                            color: "gold",
                            cursor: "pointer",
                          }}
                          onClick={() => handleFavourite(item)}
                        />
                      )}
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
