import { FaStar } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { NavLink, useParams } from "react-router-dom";
import logo from "../../../assets/8arsa copy 3 (1).png";
import styles from "./Content.module.css";
import { FaShoppingCart } from "react-icons/fa";
import useFetchAllData from "./useFetchAllData";
import { useContext } from "react";
import { CartContext } from "../../Context/CartProvider";
import { boolean } from "yup";

// eslint-disable-next-line react/prop-types, no-unused-vars
const ProductDetails = () => {
  const { data } = useFetchAllData();
  const { id } = useParams();
  const { cart, addToCart } = useContext(CartContext);
  console.log(cart);

  // eslint-disable-next-line react/prop-types
  const theItem = data.filter((item) => item.id === Number(id));

  const relaitedItems = data.filter((item) => {
    return item.categoryName === theItem[0].categoryName;
  });
  return (
    <>
      <div
        style={{
          direction: "ltr",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #eee",
            boxShadow: "2px 2px 9px -3px #333",
          }}
        >
          <NavLink
            to="/"
            style={{
              color: "#000",
              marginLeft: "19px",
            }}
          >
            ‹ الرجوع للصفحة الرئيسية
          </NavLink>
          <img
            src={logo}
            alt="logo"
            style={{
              width: "170px",
            }}
          />
        </header>

        {theItem.map((one) => {
          return (
            <div key={one.id} className={styles.wholeProductPage}>
              <div className={styles.imageAndDetail}>
                <div className={styles.productDetails}>
                  <span
                    style={{
                      color: "#6bb05f",
                      fontWeight: "700",
                      fontSize: "1.3rem",
                      background: "#c0eba6",
                      width: "100%",
                      textAlign: "center",
                      padding: "2px",
                      borderRadius: "16px 16px 0 0",
                    }}
                  >
                    تفاصيل المنتج
                  </span>
                  <div className={styles.detailLine}>
                    <div>
                      <p
                        style={{
                          color: "#6bb05f",
                          fontWeight: "700",
                        }}
                      >
                        {one.name}
                      </p>
                      <p
                        style={{
                          fontWeight: "500",
                        }}
                      >
                        اسم المنتج
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          marginRight: "8px",
                          color: "#6bb05f",
                          fontWeight: "700",
                        }}
                      >
                        {one.harvestDate}
                      </p>
                      <p
                        style={{
                          fontWeight: "500",
                        }}
                      >
                        تاريخ الحصاد
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          color: "#6bb05f",
                          fontWeight: "700",
                        }}
                      >
                        {Number(one.price) - Number(one.discount)}
                      </p>
                      <p
                        style={{
                          fontWeight: "500",
                        }}
                      >
                        السعر
                      </p>
                    </div>
                  </div>
                </div>

                <img
                  src={one.imageCover}
                  alt="product image"
                  className={styles.proImgDetail}
                />
              </div>

              <div className={styles.desBox}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    marginTop: "-10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "13px",
                      gap: "17px",
                      color: "gold",
                    }}
                  >
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p
                    style={{
                      marginRight: "9px",
                      color: "#6bb05f",
                      fontWeight: "700",
                      fontSize: "1.5rem",
                    }}
                  >
                    {one.name}
                  </p>
                </div>

                <p
                  style={{
                    fontWeight: "500",
                    marginTop: "-28px",
                    textAlign: "right",
                    padding: "7px",
                    marginRight: "9px",
                  }}
                >
                  {one.description}
                </p>
                <div
                  className={styles.priceAddChart}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <NavLink
                    to="/read/:id/cart"
                    style={{
                      marginLeft: "17px",
                      background: "#6bb05f",
                      textDecoration: "none",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "15px",
                    }}
                    onClick={() => addToCart(one)}
                  >
                    <RiShoppingCartLine />
                    <span
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      أضف الي السلة
                    </span>
                  </NavLink>
                  <p
                    style={{
                      marginRight: "20px",
                      fontSize: "1.5rem",
                      color: "#6bb05f",
                      fontWeight: "700",
                    }}
                  >
                    pounds {Number(one.price) - Number(one.discount)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/*  */}
      <div
        className={styles.secondSec}
        style={{
          direction: "ltr",
          margin: "25px 0 20px 0",
        }}
      >
        <div className={styles.mostBar}>
          {relaitedItems.length > 0 ? (
            relaitedItems.slice(0, 4).map((item) => {
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
    </>
  );
};

export default ProductDetails;
