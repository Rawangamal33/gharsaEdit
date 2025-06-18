import React, { useContext } from "react";
import { CartContext } from "../../Context/CartProvider";
import styles from "./Content.module.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router";
import useFetchAllData from "./useFetchAllData";
import { FaShoppingCart } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { boolean } from "yup";

const ShoppingList = ({ search }) => {
  const { data } = useFetchAllData();
  const filteredItems = data.filter((item) => {
    return item.discount != 0.0;
  });
  const { cart, setCart, removeFromCart, removeAll } = useContext(CartContext);
  console.log(cart);

  const searchedItemsCart = cart.filter((item) => {
    return item.name.toLowerCase().trim().includes(search.toLowerCase().trim());
  });
  const handleInreament = (item) => {
    setCart((prev) =>
      prev.map((one) =>
        one.id === item.id ? { ...one, quantity: one.quantity + 1 } : one
      )
    );
  };
  const handleDecreament = (item) => {
    setCart((prev) =>
      prev.map((one) =>
        one.id === item.id ? { ...one, quantity: one.quantity - 1 } : one
      )
    );
  };
  return (
    <div>
      <div
        className={styles.wholeShopBar}
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "6vh 0 0 0 ",
        }}
      >
        <div
          className={styles.shopList}
          style={{
            width: "700px",
            maxHeight: "400px",
            margin: "0 15px 0 5px",
            overflow: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                marginRight: "15px",
                color: "#6bb05f",
                fontWeight: "700",
              }}
            >
              سلة المشتريات
            </p>
            <p
              style={{
                color: "red",
                marginLeft: "15px",
                cursor: "pointer",
              }}
              onClick={removeAll}
            >
              مسح الكل
            </p>
          </div>
          <table className={styles.shopTable}>
            <thead>
              <tr>
                <td>منتجات</td>
                <td>الكمية</td>
                <td>السعر</td>
                <td
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontSize: "20px",
                  }}
                >
                  <FaTrashAlt
                    style={{ cursor: "pointer" }}
                    onClick={removeAll}
                  />
                </td>
              </tr>
            </thead>
            <tbody>
              {searchedItemsCart.length > 0 ? (
                searchedItemsCart.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.imageCover}
                          alt="image"
                          width="60px"
                          height="70px"
                          style={{
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginLeft: "15px",
                          }}
                        />
                        {item.name}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            border: "1px solid gray",
                            borderRadius: "5px",
                          }}
                        >
                          <CiSquarePlus
                            onClick={() => handleInreament(item)}
                            style={{
                              cursor: "pointer",
                            }}
                          />
                          &nbsp;
                          {item.quantity}&nbsp;
                          <CiSquareMinus
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => handleDecreament(item)}
                          />
                        </p>
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                      >
                        $
                        {(Number(item.price) - Number(item.discount)) *
                          cart.find((one) => one.id === item.id)?.quantity}
                      </td>
                      <td
                        style={{
                          color: "red",
                          padding: "0 1px 0 1px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => removeFromCart(item.id)}
                      >
                        ازالة <FaRegTrashCan />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p
                  style={{
                    color: "#6bb05f",
                    textAlign: "left",
                    fontSize: "1.5rem",
                    margin: "15px 30px 0 0",
                  }}
                >
                  لا توجد منتجات في السلة
                </p>
              )}
            </tbody>
          </table>
        </div>
        <div
          className={styles.payCer}
          style={{
            width: "250px",
            height: "150px",
            margin: "0 10px 0 10px",
            border: "1px solid #ddd",
            boxShadow: "2px 2px 9px  #ddd",
            borderRadius: "10px",
            marginTop: "14vh",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              color: "#6bb05f",
              fontWeight: "700",
              margin: "30px 0",
            }}
          >
            <p>الاجمالي </p>
            <p>
              :$
              {searchedItemsCart.reduce((sum, item) => {
                const cartItem = cart.find((one) => one.id === item.id);

                const quantity = cartItem && cartItem.quantity;
                return item.price * quantity + sum;
              }, 0)}
            </p>
          </div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <NavLink
              to="/read/:id/cart/profile"
              style={{
                background: "#6bb05f",
                color: "#fff",
                padding: "2px 42px",
                borderRadius: "8px",
              }}
            >
              تاكيد الشراء
            </NavLink>
          </div>
        </div>
      </div>

      <div
        className={styles.thirdSec}
        style={{
          direction: "ltr",
          margin: "30px 0 0 0",
        }}
      >
        <div className={styles.saleLink}>
          <p className={styles.pLink}>
            <NavLink to="/"> ‹ عرض المزيد </NavLink>
          </p>
          <p className={styles.pWord}>منتجات</p>
        </div>
        <div className={styles.saleBar}>
          {filteredItems.length > 0 ? (
            filteredItems.slice(0, 4).map((item) => {
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
      </div>
    </div>
  );
};

export default ShoppingList;
