import axios from "axios";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, NavLink, useNavigate } from "react-router-dom";
import img2 from "../../assets/Rectangle 62.png";
import imgbackground from "../../assets/0599f0f621342c590de5656ae157af40.jfif";

export default function ForgetPassword() {
  const [errMsg, setErr] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // تعريف Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string().required("Email Required").email("Enter Valid Email"),
  });

  // تعريف useFormik للنموذج
  const form = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleForgetPassword,
    validationSchema,
  });

  // دالة إرسال البريد الإلكتروني لاستعادة كلمة المرور
  async function handleForgetPassword(values) {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://agricommerce.runasp.net/api/Account/forget-password",
        {
          email: values.email,
          clientUrl: `${window.location.origin}/ResetPassword`, // Corrected template literal
        },
        {
          headers: {
            accept: "/",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        navigate("/ForgetPassword"); // الانتقال إلى صفحة إعادة تعيين كلمة المرور
      }
    } catch (err) {
      console.error("API Error:", err.response?.data); // طباعة الخطأ لفهم المشكلة
      setErr(err.response?.data?.message || "حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${imgbackground})`,
        backgroundSize: "cover",
        backgroundPosition: "fixed",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div className="container-fluid my-4 d-flex">
        <Link className="navbar-brand w-25" to="/Home">
          <img src={img2} alt="logo" style={{ width: "95%" }} />
        </Link>
        <nav
          className="bg-light px-4 rounded-pill navbar navbar-expand-lg bg-body-tertiary"
          style={{ width: "48%" }}
        >
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
                    isActive ? "nav-link test" : "nav-link text-success fs-5 "
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
      </div>

      <div className="container">
        <div
          className="container p-4 bg-white position-relative text-center"
          style={{
            borderRadius: "20px",
            width: "45%",
            backgroundColor: "#fff",
            opacity: "0.8",
            marginTop: "100px",
          }}
        >
          <div
            className="bg-white p-4 rounded-circle position-absolute"
            style={{ top: "-8%", left: "43%" }}
          >
            <i
              className="fas fa-key p-2"
              style={{ fontSize: "30px", color: "#6BB05F" }}
            ></i>
          </div>

          <div className="my-5 w-50 mx-auto">
            <h2 style={{ color: "#6BB05F", fontSize: "50px" }}>
              نسيت كلمة المرور
            </h2>
          </div>

          <form onSubmit={form.handleSubmit}>
            <div className="w-75 mx-auto">
              <label htmlFor="email" className="py-2">
                البريد الإلكتروني
              </label>
              <input
                dir="ltr"
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                className="form-control rounded-pill border-dark p-2"
                type="email"
                name="email"
                id="email"
              />
              {form.errors.email && form.touched.email ? (
                <div className="alert alert-danger">{form.errors.email}</div>
              ) : (
                ""
              )}
            </div>
            {errMsg ? (
              <div className="alert alert-danger my-2">{errMsg}</div>
            ) : (
              ""
            )}
            {loading ? (
              <button type="button" className="btn text-white my-2">
                <i className="fa-solid fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="btn my-4 w-75 p-2 text-white rounded-pill"
                style={{ backgroundColor: "#6BB05F" }}
              >
                أرسل رمز التأكيد
              </button>
            )}
          </form>

          <div
            className=" bg-white text-end rounded p-3 d-flex flex-column justify-content-center align-items-center"
            style={{ direction: "rtl" }}
          >
            <h6>
              تتذكر كلمة المرور؟
              <span
                onClick={() => navigate("/loginIn")}
                style={{ color: "green", fontSize: "20px", cursor: "pointer" }}
              >
                سجل دخول
              </span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
