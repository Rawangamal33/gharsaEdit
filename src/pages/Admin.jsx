import { Outlet, useNavigate } from "react-router-dom";
import styles from "./admin.module.scss";
import Sidebar from "../admin/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserById } from "../redux/usersSlice";

const Admin = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { user, userStatus } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (userStatus === "idle") {
  //     dispatch(fetchUserById());
  //   }
  // }, [dispatch, userStatus]);

  // useEffect(() => {
  //   if (userStatus === "succeeded" && user) {
  //     if (!user.roles?.includes("Admin")) {
  //       navigate("/", { replace: true });
  //     }
  //   }
  // }, [user, navigate, userStatus]);

  // if (userStatus === "loading") {
  //   return <p>Loading....</p>;
  // }
  return (
    <div className={styles.adminPage}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
