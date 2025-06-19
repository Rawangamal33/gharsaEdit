import { useMemo } from "react";
import styles from "./Content.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { boolean } from "yup";
import { useContext } from "react";
import { FavouriteContext } from "../../Context/FavouriteProvider";
import { FaTrashAlt } from "react-icons/fa";
const Sales = ({ data, loading, fetchError, search }) => {
  const { favourites, handleFavourite } = useContext(FavouriteContext);

  const filteredItems = useMemo(() => {
    return data.filter((item) => {
      return item.discount !== 0.0;
    });
  }, [data]);

  const filteredSearchSales = useMemo(() => {
    return filteredItems.filter((item) => {
      return item.name
        .toLowerCase()
        .trim()
        .includes(search.toLowerCase().trim());
    });
  }, [search, filteredItems]);

  return (
    <div
      className={styles.thirdSec}
      style={{
        direction: "ltr",
      }}
    >
      <div>
        <h1
          style={{
            color: "#6BB05F",
            margin: "20px 0 20px 0",
          }}
        >
          العروض
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
          Loading...
        </p>
      ) : (
        <div className={styles.saleBar}>
          {filteredSearchSales.length > 0 ? (
            filteredSearchSales.map((item) => {
              const isFav = favourites.some((fav) => fav.id === item.id);
              return (
                <div key={item.id} className={styles.wholeItemSale}>
                  <NavLink to={`/read/${item.id}`}>
                    <img src={item.imageCover} alt={item.name} />
                  </NavLink>
                  <p className={styles.itemNameSale}>
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

                  <div className={styles.priceIconSale}>
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
                            marginRight: "7px",
                            color: "#BF0000",
                            cursor: "pointer",
                          }}
                          onClick={() => handleFavourite(item)}
                        />
                      ) : (
                        <FaStar
                          style={{
                            marginRight: "7px",
                            color: "gold",
                            cursor: "pointer",
                          }}
                          onClick={() => handleFavourite(item)}
                        />
                      )}
                      <span style={{ color: "#000" }}>السعر</span>:
                      {Number(item.price) - Number(item.discount)}
                      <del
                        style={{
                          color: "red",
                          marginLeft: "8px",
                        }}
                      >
                        {item.price}
                      </del>
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

export default Sales;
