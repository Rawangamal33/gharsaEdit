import { Link, NavLink, useNavigate } from "react-router-dom";
import img2 from "../../assets/Rectangle 62.png";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import imgbackground from "../../assets/Rectangle 110.png";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkBoxError, setCheckBoxError] = useState("");
  let navg = useNavigate();
  let [errMsg, setErr] = useState("");
  let [loading, setLoading] = useState(true);

  let validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First Name is required")
      .min(3, "Min 3 Char")
      .max(20, "Must be 20 characters or less"),
    lastName: Yup.string()
      .required("Last Name is required")
      .min(3, "Min 3 Char")
      .max(20, "Must be 20 characters or less"),
    email: Yup.string().required("Email Required").email("Enter Valid Email"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Confirm password is not matched")
      .required("Confirm Password is required"),
    mobile: Yup.string()
      .matches(/^01[1025][0-9]{8}$/, "Enter valid Phone")
      .required("Phone is Required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9A-Z!@#$%^&*()-_]{6,16}$/,
        "First letter uppercase, digits, sign"
      )
      .required("Password is Required"),
    governorate: Yup.string()
      .required("The Governorate is required")
      .matches(/^[\u0600-\u06FFa-zA-Z\s]+$/, "Must contain letters only")
      .min(3, "Must be more than 3 digits"),
    city: Yup.string()
      .required("The City is required")
      .matches(/^[\u0600-\u06FFa-zA-Z\s]+$/, "Must contain letters only")
      .min(3, "Must be more than 3 digits"),
    // imageCover:Yup.string()
  });

  let form2 = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      confirmPassword: "",
      mobile: "",
      password: "",
      governorate: "",
      city: "",
      imageCover: null,
    },
    onSubmit: registerApi,
    validationSchema,
  });

  async function registerApi(values) {
    if (!isChecked) {
      setErr("يجب الموافقة على الشروط والتعليمات للتسجيل");
      return;
    }
    setLoading(false);

    const formData = new FormData();
    formData.append("FirstName", values.firstName);
    formData.append("LastName", values.lastName);
    formData.append("Email", values.email);
    formData.append("Mobile", values.mobile);
    formData.append("Password", values.password);
    formData.append("ConfirmPassword", values.confirmPassword);
    formData.append("Governorate", values.governorate);
    formData.append("City", values.city);
    if (values.imageCover) {
      formData.append("Image", values.imageCover);
    } else {
      formData.append("Image", ""); // إرسال قيمة فارغة إذا لم يتم تحميل صورة
    }

    console.log("Sending FormData:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        "https://agricommerce.runasp.net/api/Account/register",
        formData,
        {
          headers: {
            accept: "text/plain",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === "success") {
        setLoading(true);
        navg("/loginIn");
      }
    } catch (error) {
      console.error("Error response:", error.response);
      if (error.response?.data?.errors) {
        setErr(error.response.data.errors.join(", ")); 
      } else {
        setErr(error.response?.data?.message || "An error occurred");
      }
      setLoading(true);
    }
  }
  return (
    <>
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
        <div className="container-fluid my-5 d-flex justify-content-center ">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <nav
            className="bg-light px-4 rounded-pill navbar navbar-expand-lg bg-body-tertiary"
            style={{ width: "48%" }}
          >
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav d-flex list-unstyled m-0 justify-content-between w-100">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive == true
                        ? "nav-link test"
                        : "nav-link text-success fs-5"
                    }
                  >
                    الصفحة الرئيسية
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to=""
                    className={({ isActive }) =>
                      isActive == true
                        ? "nav-link test rounded-pill fs-5 px-4"
                        : "nav-link text-success fs-5 "
                    }
                  >
                    إنضم إلينا
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/ContactUs"
                    className={({ isActive }) =>
                      isActive == true
                        ? "nav-link test"
                        : "nav-link text-success fs-5 "
                    }
                  >
                    تواصل معنا
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/AboutUs"
                    className={({ isActive }) =>
                      isActive == true
                        ? "nav-link test"
                        : "nav-link text-success fs-5"
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
            to="home"
            style={{ marginLeft: "-350px" }}
          >
            <img src={img2} alt="logo" style={{ width: "95%" }} />
          </Link>
        </div>

        <div className="containerall">
          <div
            className="container w-50  p-4 my-5 bg-white opacity-75 "
            style={{ borderRadius: "20px" }}
          >
            <div className="text-center">
              <h3
                style={{
                  color: "#4C9240",
                  fontFamily: "RH-Zak",
                  fontSize: "40px",
                }}
              >
                إغرس حسابا جديداً
              </h3>
            </div>
            {/* اغرس حسابا جديدا*/}

            <div className="row">
              <div className="col-6">
                <div className="text-end">
                  <div className="">
                    <label
                      htmlFor="lastName"
                      className="fs-4"
                      style={{ fontFamily: "RH-Zak", fontSize: "20px" }}
                    >
                      الأسم الأخير
                    </label>
                    <input
                      dir="ltr"
                      onBlur={form2.handleBlur}
                      onChange={form2.handleChange}
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="form-control rounded-pill p-2 my-2  border-dark"
                    />
                    {form2.errors.lastName && form2.touched.lastName ? (
                      <div className="alert alert-danger ">
                        {form2.errors.lastName}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-end">
                  <div className="">
                    <label
                      htmlFor="firstName"
                      className="fs-4"
                      style={{ fontFamily: "RH-Zak", fontSize: "20px" }}
                    >
                      الأسم الأول
                    </label>
                    <input
                      dir="ltr"
                      onBlur={form2.handleBlur}
                      onChange={form2.handleChange}
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="form-control rounded-pill p-2 my-2  border-dark"
                    />
                    {form2.errors.firstName && form2.touched.firstName ? (
                      <div className="alert alert-danger ">
                        {form2.errors.firstName}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="text-end">
                  <div className="">
                    <label
                      htmlFor="mobile"
                      className="fs-4"
                      style={{ fontFamily: "RH-Zak", fontSize: "20px" }}
                    >
                      رقم الهاتف
                    </label>
                    <input
                      dir="ltr"
                      onBlur={form2.handleBlur}
                      onChange={form2.handleChange}
                      type="tel"
                      name="mobile"
                      id="mobile"
                      className="form-control rounded-pill p-2 my-2  border-dark"
                    />
                    {form2.errors.mobile && form2.touched.mobile ? (
                      <div className="alert alert-danger ">
                        {form2.errors.mobile}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-end">
                  <label
                    htmlFor="email"
                    className="fs-4"
                    style={{ fontFamily: "RH-Zak", fontSize: "20px" }}
                  >
                    البريد الألكتروني
                  </label>
                  <input
                    dir="ltr"
                    onBlur={form2.handleBlur}
                    onChange={form2.handleChange}
                    type="email"
                    name="email"
                    id="email"
                    className="form-control rounded-pill p-2 my-2  border-dark"
                  />
                  {form2.errors.email && form2.touched.email ? (
                    <div className="alert alert-danger ">
                      {form2.errors.email}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {/* row*/}

            <div className="row">
              <div className="col-6">
                <div className="text-end">
                  <label
                    htmlFor="confirmPassword"
                    className="fs-4"
                    style={{ fontFamily: "RH-Zak", fontSize: "20px" }}
                  >
                    تأكيد كلمة السر
                  </label>
                  <div className="position-relative">
                    <input
                      onBlur={form2.handleBlur}
                      onChange={form2.handleChange}
                      type={showConfirmPassword ? "text" : "password"} // استخدام showConfirmPassword هنا
                      name="confirmPassword"
                      id="confirmPassword"
                      className="form-control rounded-pill p-2 my-2 border-dark"
                      dir="ltr"
                    />
                    <i
                      className={`fa-solid ${
                        showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                      } position-absolute`}
                      style={{
                        right: "15px",
                        top: "50%",
                        fontSize: "18px",
                        color: "#4C9240",
                        padding: "5px 8px",
                        borderRadius: "50%",
                        boxShadow: "0px 0px 5px rgb(5, 5, 5)",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowConfirmPassword((prev) => !prev)} // استخدام setShowConfirmPassword هنا
                    ></i>
                  </div>
                  {form2.errors.confirmPassword &&
                  form2.touched.confirmPassword ? (
                    <div className="alert alert-danger ">
                      {form2.errors.confirmPassword}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="text-end">
                  <label
                    htmlFor="password"
                    className="fs-4"
                    style={{ fontFamily: "RH-Zak", fontSize: "20px" }}
                  >
                    {" "}
                    كلمة السر{" "}
                  </label>
                  <div className="position-relative">
                    <input
                      dir="ltr"
                      onBlur={form2.handleBlur}
                      onChange={form2.handleChange}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="form-control rounded-pill p-2 my-2 border-dark"
                    />
                    <i
                      className={`fa-solid ${
                        showPassword ? "fa-eye" : "fa-eye-slash"
                      } position-absolute`}
                      style={{
                        right: "15px",
                        top: "50%",
                        fontSize: "18px",
                        color: "#4C9240",
                        padding: "5px 8px",
                        borderRadius: "50%",
                        boxShadow: "0px 0px 5px rgb(5, 5, 5)",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowPassword((prev) => !prev)}
                    ></i>
                  </div>
                  {form2.errors.password && form2.touched.password ? (
                    <div className="alert alert-danger ">
                      {form2.errors.password}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {/* row*/}

            <div className="row">
              <div className="col-6">
                <div className="text-end">
                  <label htmlFor="city" className="fs-4">
                    المدينة
                  </label>
                  <input
                    dir="ltr"
                    onBlur={form2.handleBlur}
                    onChange={form2.handleChange}
                    type="text"
                    name="city"
                    id="city"
                    className="form-control rounded-pill p-2 my-2  border-dark"
                  />
                  {form2.errors.city && form2.touched.city ? (
                    <div className="alert alert-danger ">
                      {form2.errors.city}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="text-end">
                  <label htmlFor="governorate" className="fs-4">
                    المحافظة
                  </label>
                  <input
                    dir="ltr"
                    onBlur={form2.handleBlur}
                    onChange={form2.handleChange}
                    type="text"
                    name="governorate"
                    id="governorate"
                    className="form-control rounded-pill p-2 my-2  border-dark"
                  />
                  {form2.errors.governorate && form2.touched.governorate ? (
                    <div className="alert alert-danger ">
                      {form2.errors.governorate}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {/* row*/}

            <div className="col-12">
              <div className="text-end">
                <label htmlFor="imageCover" className="fs-4">
                  صورة الغلاف
                </label>
                <input
                  dir="ltr"
                  type="file"
                  name="imageCover"
                  onChange={(event) => {
                    form2.setFieldValue(
                      "imageCover",
                      event.currentTarget.files[0]
                    );
                  }}
                  className="form-control rounded-pill p-2 my-2 border-dark"
                />
              </div>
            </div>

            <div className="container mt-4">
              <div className="rounded p-3">
                <ul className=" mb-0 text-end" dir="rtl">
                  <li
                    className="mb-2"
                    style={{ fontWeight: "bold", fontSize: "20px" }}
                  >
                    تقديم وصف دقيق لكل منتج، مع تحديد السعر، والصور الواضحة.
                  </li>
                  <li
                    className="mb-2"
                    style={{ fontWeight: "bold", fontSize: "20px" }}
                  >
                    الالتزام بمعايير الصحة والسلامة وجودة المنتجات.
                  </li>
                  <li
                    className="mb-2"
                    style={{ fontWeight: "bold", fontSize: "20px" }}
                  >
                    الالتزام بمواعيد التسليم المحددة وعدم التأخير غير المبرر.
                  </li>
                  <li
                    className=""
                    style={{ fontWeight: "bold", fontSize: "20px" }}
                  >
                    ضمان جودة المنتج أثناء النقل والتخزين.
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="d-flex align-items-center justify-content-start"
              dir="rtl"
            >
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                className="me-3 my-4"
                style={{ transform: "scale(1.4)", borderRadius: "15px" }}
                onChange={() => {
                  setIsChecked(!isChecked);
                  setCheckBoxError("");
                }}
              />
              <label
                htmlFor="checkbox"
                className=" px-3 text-success"
                style={{
                  fontFamily: "RH-Zak",
                  fontSize: "25px",
                  color: "#6BB05F",
                }}
              >
                اوافق على جميع التعليمات والشروط
              </label>
            </div>

            {checkBoxError && (
              <div className="alert alert-danger">{checkBoxError}</div>
            )}

            {errMsg !== "" ? (
              <div className="alert alert-danger text-center">{errMsg}</div>
            ) : (
              ""
            )}

            <div className="d-flex justify-content-center align-items-center">
              {loading ? (
                <button
                  type="submit"
                  disabled={!isChecked || !(form2.isValid && form2.dirty)}
                  onClick={form2.handleSubmit}
                  className="rounded-pill text-white"
                  style={{
                    width: "450px",
                    border: "none",
                    height: "55px",
                    backgroundColor: "#64b356",
                    fontFamily: "RH-Zak",
                    fontSize: "28px",
                  }}
                >
                  إنشئ حساب
                </button>
              ) : (
                <button type="button" className="btn bg-main text-white mx-2">
                  <i className="fa-solid fa-spinner fa-spin"></i>
                </button>
              )}
            </div>

            <div
              className="  bg-white text-end rounded p-3 d-flex flex-column justify-content-center align-items-center my-3"
              style={{ direction: "rtl" }}
            >
              <h6>
                تمتلك بالفعل حساب؟
                <span
                  onClick={() => navg("/loginIn")}
                  style={{
                    color: "green",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                >
                  سجل دخول
                </span>
              </h6>
            </div>
          </div>{" "}
          {/* container*/}
        </div>
        {/* containerall*/}
      </div>
    </>
  );
}
