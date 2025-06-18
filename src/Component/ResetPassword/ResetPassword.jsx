import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import img2 from "../../assets/Rectangle 62.png";

export default function ResetPassword() {
  const [errMsg, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // استخراج token من query parameters
  const queryParams = new URLSearchParams(location.search);
  const tokenFromUrl = queryParams.get("token");

  // تعريف Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string().required("Email Required").email("Enter Valid Email"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9A-Z!@#$%^&*()-_]{6,16}$/,
        "Password must start with an uppercase letter, contain 6-16 characters and any sign (!@#$%^&*) "
      )
      .required("New Password is Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is Required"),
    token: Yup.string().required("Token is Required"), // إضافة validation للتوكين
  });

  // تعريف useFormik
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      token: tokenFromUrl || "", // إضافة token من query parameters أو ترك الحقل فارغًا
    },
    onSubmit: handleResetPassword,
    validationSchema,
  });

  // دالة إعادة تعيين كلمة المرور
  async function handleResetPassword(values) {
    try {
      const response = await axios.post(
        "https://agricommerce.runasp.net/api/Account/reset-password",
        {
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          token: values.token, // إرسال token من القيم المدخلة
        },
        {
          headers: {
            accept: "/",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        console.log("API Response:", response.data);
        setSuccessMsg("تم إعادة تعيين كلمة المرور بنجاح.");
        setTimeout(() => {
          navigate("/");
        }, 2000); // الانتقال إلى الصفحة الرئيسية بعد 2 ثواني
      }
    } catch (err) {
      console.error("API Error:", err.response?.data);
      setErr(
        err.response?.data?.message ||
          "حدث خطأ أثناء إعادة تعيين كلمة المرور."
      );
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url("https://s3-alpha-sig.figma.com/img/6f3c/1f46/0599f0f621342c590de5656ae157af40?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ffKvbjtmLI1zPQlPykd0a-~n8hn6IsbKQlY0xGpLVDv4C~sqIqYcmv6N7qlwoU1v2AvjNQ6~RyTmmsGHhp7JXcfGuenqTNt9CauOn-n8T2kjRFa7AV-IJcAAmJIzYuckAk-Cg6Tpz5wRjEJUj-F1LLZZYFvOlBNGMv56B5MOSwONvO0n~NnfQfUs05JxssWmSqlKt~R-hVMlc~Ezi8FJWH2KL8J8sgzGFbD0Q3VMAasi4NGpyvQkPeEjBClODBEsRQ7OOul8qsRTpWdFQK3Q5Wt8Ds2-sesh0wgZC98~ukis74U9C4AXd15Ja9uVVY2Kq5iFhFUdHEbZWUS~USFrqg__")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
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
                  to="/Home"
                  className={({ isActive }) =>
                    isActive ? "nav-link test" : "nav-link text-success fs-5"
                  }
                >
                  الصفحة الرئيسية
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
                  إنضم إلينا
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
          <h2 className="my-2">إعادة ضبط كلمة المرور</h2>
          <form onSubmit={form.handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="py-2">
                البريد الإلكتروني
              </label>
              <input
                dir="ltr"
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                className="form-control rounded-pill w-75 mx-auto"
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

            {/* New Password Input */}
            <div className="position-relative w-75 mx-auto">
              <label htmlFor="password" className="py-2">
                كلمة السر الجديدة
              </label>
              <div style={{ position: "relative" }}>
                <input
                  dir="ltr"
                  onBlur={form.handleBlur}
                  onChange={form.handleChange}
                  className="form-control rounded-pill"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  style={{ paddingRight: "40px" }}
                />
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye" : "fa-eye-slash"
                  }`}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    zIndex: 2,
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
              {form.errors.password && form.touched.password ? (
                <div className="alert alert-danger">{form.errors.password}</div>
              ) : (
                ""
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="position-relative w-75 mx-auto">
              <label htmlFor="confirmPassword" className="py-2">
                تأكيد كلمة السر
              </label>
              <div style={{ position: "relative" }}>
                <input
                  dir="ltr"
                  onBlur={form.handleBlur}
                  onChange={form.handleChange}
                  className="form-control rounded-pill"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  style={{ paddingRight: "40px" }}
                />
                <i
                  className={`fa-solid ${
                    showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                  }`}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    zIndex: 2,
                  }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                ></i>
              </div>
              {form.errors.confirmPassword && form.touched.confirmPassword ? (
                <div className="alert alert-danger">
                  {form.errors.confirmPassword}
                </div>
              ) : (
                ""
              )}
            </div>

            {/* Token Input */}
            <div className="w-75 mx-auto">
              <label htmlFor="token" className="py-2">
                رمز التأكيد (Token)
              </label>
              <input
                dir="ltr"
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                className="form-control rounded-pill"
                type="text" // نوع الحقل نص (text) وليس مخفيًا
                name="token"
                id="token"
                value={form.values.token} // ربط القيمة بالقيم الأولية
              />
              {form.errors.token && form.touched.token ? (
                <div className="alert alert-danger">{form.errors.token}</div>
              ) : (
                ""
              )}
            </div>

            {/* Error Message */}
            {errMsg ? (
              <div className="alert alert-danger my-2">{errMsg}</div>
            ) : (
              ""
            )}

            {/* Success Message */}
            {successMsg ? (
              <div className="alert alert-success my-2">{successMsg}</div>
            ) : (
              ""
            )}

            {/* Submit Button */}
            <button
              disabled={!(form.isValid && form.dirty)}
              type="submit"
              className="btn my-3 text-white rounded-pill w-75"
              style={{ backgroundColor: "green" }}
            >
              إعادة كلمة المرور
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
