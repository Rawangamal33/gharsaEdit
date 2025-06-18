import { NavLink, useNavigate } from "react-router-dom";
import styles from "./sidebar.module.scss";
import { logo } from "../../assets";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserById } from "../../redux/usersSlice";

const Sidebar = () => {
  const [userAdmin, setUserAdmin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, userStatus } = useSelector((state) => state.user);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUserById());
    }
  }, [dispatch, userStatus]);

  useEffect(() => {
    if (userStatus === "succeeded" && user?.roles?.includes("Admin")) {
      setUserAdmin(true);
    }
  }, [userStatus, user]);

  const sidebarLinks = [
    { id: 0, name: "الصفحة الرئيسية", path: "/" },
    { id: 1, name: "الطلبات", path: "/admin/orders" },
    { id: 2, name: "المبيعات", path: "/admin/sales" },
    { id: 3, name: "مجموعتي", path: "/admin/my-group" },
    ...(userAdmin
      ? [
          { id: 4, name: "الفئات", path: "/admin/categories" },
          { id: 5, name: "البائعين", path: "/admin/saler" },
          { id: 6, name: "المنتجات", path: "/admin/all-products" },
          { id: 7, name: "البروفيل", path: "/admin/account" },
        ]
      : []),
  ];

  const handleLogout = () => {
    // هنا تضع الكود المناسب لتسجيل الخروج
    console.log("تسجيل الخروج");
    navigate("/loginIn");
  };

  if (userStatus === "loading") {
    return <p>جاري التحميل...</p>;
  }

  return (
    <div className={styles["sidebar-container"]}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>

      <div className={styles["sidebar-links"]}>
        <h2>القائمة</h2>
        <ul>
          {sidebarLinks.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles["logout"]}>
          <button className="--btn" onClick={handleLogout}>
            تسجيل الخروج
          </button>
          <RiLogoutCircleRLine
            style={{
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
