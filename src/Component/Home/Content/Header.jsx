import styles from "./Content.module.css";
import logo from "../../../assets/8arsa copy 2.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} className={styles.logoHeader} alt="logo" />
      <p>
        هذه المنصة تربط المستهلكين بالمزارعين المحليين لتوفير منتجات طازجة وصحية
        مباشرة,
      </p>
      <p>مع دعم الاقتصاد المحلي وتقليل الأثر البيئي عبر تقنيات توصيل مستدامة</p>
    </header>
  );
};

export default Header;
