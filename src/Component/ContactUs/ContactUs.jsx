import { Link, NavLink } from "react-router";
import img2 from "../../assets/Rectangle 62.png";
import { useState } from "react";
import letterSend from "../../assets/letter_send 1.png";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  // تحديث القيم عند الكتابة
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // إرسال البيانات إلى واتساب
  const sendToWhatsApp = () => {
    const { firstName, lastName, phone, email, message } = formData;
    const whatsappNumber = "+201028744803";

    const whatsappMessage = `الاسم: ${firstName} ${lastName}%0A📞 الهاتف: ${phone}%0A📧 البريد الإلكتروني: ${email}%0A📝 الرسالة: ${message}`;

    const whatsappLink = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`;

    window.open(whatsappLink, "_blank");

    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white "
        style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.36)" }}
      >
        <Link to="/Home" className="navbar-brand w-25  ">
          <img src={img2} alt="logo" style={{ width: "80%" }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent ">
          <ul className="navbar-nav ms-auto" style={{ paddingRight: "10%" }}>
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
                to="/loginIn"
                className={({ isActive }) =>
                  isActive == true
                    ? "nav-link test"
                    : "nav-link text-success fs-5 px-3"
                }
              >
                إنضم إلينا
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to=""
                className={({ isActive }) =>
                  isActive == true
                    ? "nav-link test  rounded-pill fs-5 px-4"
                    : "nav-link text-success fs-5"
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
                    ? "nav-link test  rounded-pill fs-5 px-4"
                    : "nav-link text-success fs-5"
                }
              >
                من نحن
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container-fluid text-center">
        <h1 className="my-5" style={{ color: "#5B5F62" }}>
          تواصل معنا
        </h1>
      </div>

      <div
        className="container-fluid  mx-auto my-3 d-flex"
        dir="ltr"
        style={{ textAlign: "left" }}
      >
        <div
          className="p-5 rounded text-white "
          dir="ltr"
          style={{ backgroundColor: "rgb(33, 173, 47)", width: "45%" }}
        >
          <div className=" w-50">
            <h2 className="text-center">معلومات التواصل</h2>
            <p className="fs-5 text-secondary px-2">أترك رسالة</p>
          </div>

          <div className="my-5">
            <span>
              <i className="fas fa-phone-volume  px-3"></i> +20 15 51215126
            </span>
            <p className="py-4">
              <span>
                <i className="fas fa-envelope px-3"></i> monaallam5102@gmail.com
              </span>
            </p>
          </div>

          <div className="d-flex px-3 gap-3 " style={{ paddingTop: "300px" }}>
            {/* تويتر */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "#1DA1F2",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                color: "white",
                textDecoration: "none",
                fontSize: "20px",
              }}
            >
              <i className="fab fa-twitter"></i>
            </a>

            {/* إنستجرام */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "white",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                color: "black",
                textDecoration: "none",
                fontSize: "20px",
              }}
            >
              <i className="fab fa-instagram"></i>
            </a>

            {/* واتساب */}
            <a
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "#25D366",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                color: "white",
                textDecoration: "none",
                fontSize: "20px",
              }}
            >
              <i className="fab fa-whatsapp"></i>
            </a>

            {/* فيسبوك */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "black",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                color: "white",
                textDecoration: "none",
                fontSize: "20px",
              }}
            >
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>

        {/* الصندوق الأبيض */}
        <div
          className="p-5 rounded "
          style={{ backgroundColor: "white", width: "55%", minHeight: "400px" }}
        >
          <div className=" ">
            <div className="row">
              <div className="col-md-6 mb-3 text-end">
                <label htmlFor="firstName" className="text-secondary">
                  الأسم الاول
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderBottom: "0.08px solid",
                    borderColor: "transparent transparent grey transparent",
                  }}
                />
              </div>
              <div className="col-md-6 mb-3 text-end">
                <label htmlFor="lastName" className="text-secondary">
                  الأسم الأخير
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderBottom: "0.08px solid",
                    borderColor: "transparent transparent grey transparent",
                  }}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6 mb-3 text-end">
                <label htmlFor="email" className="text-secondary">
                  البريد الألكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderBottom: "0.08px solid",
                    borderColor: "transparent transparent grey transparent",
                  }}
                />
              </div>
              <div className="col-md-6 mb-3 text-end">
                <label htmlFor="phone" className="text-secondary">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    border: "none",
                    borderBottom: "0.08px solid",
                    borderColor: "transparent transparent grey transparent",
                  }}
                />
              </div>
            </div>
            <div className="text-end mt-4">
              <label htmlFor="message" className="text-secondary">
                المحتوي
              </label>
              <input
                type="text"
                name="message"
                className="form-control"
                value={formData.message}
                placeholder="📝 اكتب رسالتك هنا..."
                onChange={handleChange}
                style={{
                  border: "none",
                  borderBottom: "0.08px solid",
                  borderColor: "transparent transparent grey transparent",
                }}
              />
            </div>

            <div className="text-end">
              <button
                onClick={sendToWhatsApp}
                type="submit"
                className="btn w-25 mt-5"
                style={{ backgroundColor: "rgb(33, 173, 47)" }}
              >
                📩 إرسال الرسالة
              </button>
            </div>

            <div className="pt-5" style={{ paddingLeft: "150px" }}>
              <img src={letterSend} alt="lettersend" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
