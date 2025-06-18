// eslint-disable-next-line no-unused-vars
import { Fragment, useContext, useEffect, useState } from "react";
import "./App.css";
import { Toaster } from "sonner";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router";
import Admin from "./pages/Admin";
import Orders from "./admin/orders/Orders";
import Salers from "./admin/salers/Salers";
import Sales from "./admin/sales/Sales";
import Categories from "./admin/categories/Categories";
import MyGroup from "./admin/myGroup/MyGroup";
import AddNemGroup from "./admin/myGroup/AddNemGroup";
import EditMyGroup from "./admin/myGroup/EditMyGroup";
import AllProducts from "./admin/allProducts/AllProducts";
import Acount from "./admin/acount/Acount";
import OrderDetails from "./admin/orders/OrderDetails";
import Home from "./Component/Home/Home";
import { TokenContext } from "./Component/Context/TokenContext";
import AboutUs from "./Component/AboutUs/AboutUs";
import ContactUs from "./Component/ContactUs/ContactUs";
import Register from "./Component/Register/Register";
import ForgetPassword from "./Component/ForgetPassword/ForgetPassword";
import ResetPassword from "./Component/ResetPassword/ResetPassword";
import SignIn from "./Component/SignIn/SignIn";
import NotFound from "./Component/NotFound/NotFound";
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import SectionRoutes from "./Component/Home/Content/SectionRoutes";
import ProductDetails from "./Component/Home/Content/ProductDetails";
import CartPage from "./Component/Home/Content/CartPage";
import CartProvider from "./Component/Context/CartProvider";
import ProfileOrder from "./Component/Home/Content/ProfileOrder";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "./redux/usersSlice";
import ProtectedRouting from "./Component/ProtectedRouting/ProtectedRouting";

const Layout = () => {
  return (
    <Fragment>
      <Toaster
        richColors
        position="top-center"
        style={{ fontFamily: "var(main-font)" }}
      />
      <Outlet />
    </Fragment>
  );
};

function App() {
  const [userAdmin, setUserAdmin] = useState(false);
  const dispatch = useDispatch();
  const { user, userStatus } = useSelector((state) => state.user);

  // Handle fetching user data
  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUserById());
    }
  }, [dispatch, userStatus]);

  // Set userAdmin state only if the user is an Admin
  useEffect(() => {
    if (userStatus === "succeeded" && user?.roles?.includes("Admin")) {
      setUserAdmin(true);
    }
  }, [user, userStatus]);

  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <CartProvider>
          <Layout />
        </CartProvider>
      ),
      children: [
        { index: true, element:<Home />},
        { path: "aboutUs", element: <AboutUs />  },
        { path: "contactUs", element: <ContactUs />  },
        { path: "/Register", element: <Register /> },
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "ResetPassword", element: <ResetPassword /> },
        { path: "loginIn", element: <SignIn /> },
        {
          path: "section-routes/*",
          element: <SectionRoutes />,
        },
        {
          path: "/read/:id",
          element: <ProductDetails />  , 
        },
        {
          path: "/read/:id/cart",
          element:<CartPage />, 
        },
        {
          path: "/read/:id/cart/profile",
          element: (<ProtectedRouting><ProfileOrder /></ProtectedRouting>  ) ,
        },
        { path: "*", element: <NotFound /> },
        {
          path: "/admin",
          element: (<ProtectedRouting><Admin /></ProtectedRouting>  ) ,
          children: [
            { path: "my-group", element: <MyGroup /> },
            { path: "add-group", element: <AddNemGroup /> },
            { path: "edit-my-group", element: <EditMyGroup /> },
            { path: "orders", element: <Orders /> },
            { path: "order/:id", element: <OrderDetails /> },
            { path: "sales", element: <Sales /> },
            {
              path: "saler",
              element: userAdmin ? <Salers /> : <Navigate to="admin" />,
            },
            {
              path: "categories",
              element: userAdmin ? <Categories /> : <Navigate to="/admin" />,
            },
            {
              path: "all-products",
              element: userAdmin ? <AllProducts /> : <Navigate to="/admin" />,
            },
            {
              path: "account",
              element: userAdmin ? <Acount /> : <Navigate to="/admin" />,
            },
          ],
        },
      ],
    },
  ]);

  // Token context logic
  let { setToken } = useContext(TokenContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setToken(localStorage.getItem("userToken"));
    }
  }, [setToken]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
