import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";
import * as Yup from "yup";
import { useContext, useState } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TokenContext } from "../Context/TokenContext";
import image from "../../assets/Rectangle 62.png";
import backgroungImg from "../../assets/happy-plant-parents-holding-their-potted-plants-2023-11-27-05-29-06-utc (1) 1.png";
// import imgbackground from "../../assets/happy-plant-parents-holding-their-potted-plants-2023-11-27-05-29-06-utc (1) 1.png"

export default function SignIn() {
  const { setToken } = useContext(TokenContext);
  const [errMsg, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // تعريف Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Enter Valid Email"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9A-Z!@#$%^&*()-_]{6,16}$/,
        "First letter uppercase, digits, sign, more than 6 letters"
      )
      .required("Password is Required"),
  });

  // تعريف useFormik
  const form1 = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: LoginApi,
    validationSchema,
  });

  // دالة تسجيل الدخول
  async function LoginApi(values) {
    setLoading(false);
    setErr("");

    try {
      const response = await axios.post(
        "https://agricommerce.runasp.net/api/Account/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            accept: "text/plain",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        const decodedToken = decodeToken(response.data.token);
        const nameIdentifier =
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];
        localStorage.setItem("nameIdentifier", nameIdentifier);
        const userData = response.data; // بيانات المستخدم المرجعة من الـ API
        setLoading(true);
        localStorage.setItem("userToken", response.data.token); // حفظ التوكن
        localStorage.setItem("userData", JSON.stringify(userData)); // حفظ بيانات المستخدم
        setToken(response.data.token); // تحديث التوكن في الـ Context

        // التحقق من البريد الإلكتروني وكلمة المرور

        navigate("/admin");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        setErr(error.response.data.message || "Invalid username or password");
      } else {
        setErr("حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.");
      }
      setLoading(true);
    }
  }
  const decodeToken = (authToken) => {
    try {
      const decoded = jwtDecode(authToken);
      return decoded;
    } catch {
      return null;
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("${backgroungImg}")`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div className="container-fluid my-5 d-flex justify-content-center">
        <nav
          className="bg-light px-4 rounded-pill navbar navbar-expand-lg "
          style={{ width: "48%" }}
        >
          {/* <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav d-flex list-unstyled m-0 justify-content-between w-100">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link test" : "nav-link text-success fs-5"
                  }
                >
                  الصفحة الرئيسية
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to=""
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link test rounded-pill fs-5 px-4"
                      : "nav-link text-success fs-5"
                  }
                >
                  إنضم إلينا
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/ContactUs"
                  className={({ isActive }) =>
                    isActive ? "nav-link test" : "nav-link text-success fs-5"
                  }
                >
                  تواصل معنا
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/AboutUs"
                  className={({ isActive }) =>
                    isActive ? "nav-link test" : "nav-link text-success fs-5"
                  }
                >
                  من نحن
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <Link
          className="navbar-brand w-25"
          to="/Home"
          style={{ marginLeft: "-350px" }}
        >
          {" "}
          <img src={image} alt="logo" style={{ width: "95%" }} />
        </Link>
      </div>

      <div
        className="container w-50 p-5 my-5 bg-white opacity-75"
        style={{ borderRadius: "30px" }}
      >
        <div className="my-3 text-center">
          <img src={image} alt="logo" />
        </div>
        <div className="text-center">
          <form onSubmit={form1.handleSubmit}>
            <div className="mx-auto text-end" style={{ width: "65%" }}>
              <label htmlFor="email" className="py-2">
                أسم المستخدم أو البريد الإلكتروني
              </label>
              <input
                dir="ltr"
                onBlur={form1.handleBlur}
                onChange={form1.handleChange}
                className="form-control"
                style={{
                  border: "0.79px solid",
                  borderColor: "transparent transparent grey transparent",
                }}
                type="email"
                name="email"
                id="email"
              />

              {form1.errors.email && form1.touched.email ? (
                <div
                  className="alert alert-danger "
                  style={{ textAlign: "left" }}
                >
                  {form1.errors.email}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="py-3 mx-auto text-end" style={{ width: "65%" }}>
              <label htmlFor="password" className="py-2">
                كلمة المرور
              </label>
              <div className="position-relative input-container">
                <input
                  dir="ltr"
                  onBlur={form1.handleBlur}
                  onChange={form1.handleChange}
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  style={{
                    paddingRight: "40px",
                    border: "none",
                    borderBottom: "0.09px solid",
                    backgroundColor: "transparent transparent grey transparent",
                  }}
                />
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye" : "fa-eye-slash"
                  } position-absolute`}
                  style={{
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword((prev) => !prev)}
                ></i>
              </div>
              {form1.errors.password && form1.touched.password ? (
                <div
                  className="alert alert-danger "
                  style={{ textAlign: "left" }}
                >
                  {form1.errors.password}
                </div>
              ) : (
                ""
              )}
            </div>

            {/* Error Message */}
            {errMsg && <div className="alert alert-danger">{errMsg}</div>}

            {/* Submit Button */}
            {loading ? (
              <button
                disabled={!(form1.isValid && form1.dirty)}
                type="submit"
                className="rounded-pill text-white my-5"
                style={{
                  width: "350px",
                  backgroundColor: "#64b356",
                  padding: "15px",
                  fontSize: "18px",
                }}
              >
                تسجيل الدخول
              </button>
            ) : (
              <button type="button" className="btn text-white mx-2">
                <i className="fa-solid fa-spinner fa-spin"></i>
              </button>
            )}
          </form>
          <h4
            style={{ cursor: "pointer" }}
            className="my-3"
            onClick={() => navigate("/ForgetPassword")}
          >
            نسيت كلمة المرور
          </h4>
        </div>
      </div>

      <div className="container w-25 bg-white text-end rounded p-3 d-flex flex-column justify-content-center align-items-center my-3">
        <h6>
          ليس لديك حساب؟
          <span
            onClick={() => navigate("/Register")}
            style={{ color: "green", cursor: "pointer" }}
          >
            إنشئ حساب
          </span>
        </h6>
      </div>
    </div>
  );
}
