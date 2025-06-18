import { NavLink } from "react-router-dom";
import styles from "./Content.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { boolean } from "yup";

const ThirdSec = ({ data, search }) => {
  const filteredItems = data.filter((item) => {
    return item.discount != 0.0;
  });
  const filteredSearchSales = filteredItems.filter((item) => {
    return item.name.toLowerCase().trim().includes(search.toLowerCase().trim());
  });
  return (
    <div
      className={styles.thirdSec}
      style={{
        direction: "ltr",
        margin: "25px 0 0 0",
      }}
    >
      <div className={styles.saleLink}>
        <p className={styles.pLink}>
          <NavLink to="/section-routes/sales"> ‹ عرض المزيد </NavLink>
        </p>
        <p className={styles.pWord}>العروض</p>
      </div>
      <div className={styles.saleBar}>
        {filteredSearchSales.length > 0 ? (
          filteredSearchSales.slice(0, 4).map((item) => {
            return (
              <div key={item.id} className={styles.wholeItemSale}>
                <img src={item.imageCover} alt={item.name} />
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
  );
};

export default ThirdSec;
