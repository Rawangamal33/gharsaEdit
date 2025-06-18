import { Link, NavLink } from "react-router";
import img2 from "../../assets/Rectangle 62.png";
import img3 from "../../assets/Be kind to pot plants.png";

export default function AboutUs() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white "
        style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.33)" }}
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
          <ul className="navbar-nav ms-auto" style={{ paddingRight: "15%" }}>
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
                من نحن
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className="w-75 mx-auto py-5 my-5"
        dir="ltr"
        style={{ marginRight: "20px" }}
      >
        <div className="row g-0">
          <div className="col-8"></div>
          <div
            className="col-4 rounded"
            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.27)" }}
          >
            <div className="text-center">
              <h2>مهمتنا</h2>
              <div className="mx-auto w-75">
                <h4>
                  في غرسه، نسعى إلى تغيير الطريقة التي يتصل بها الناس بالمنتجات
                  المحلية الطازجة والمستدامة. من خلال ربط المنتجين المحليين
                  بالمستهلكين، نعمل على إنشاء مجتمع يقدر الجودة والشفافية
                  والمسؤولية البيئية.
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="container w-100 d-flex justify-content-between align-items-center">
          {/* صندوق النص (مرتفع قليلاً) */}
          <div
            className="text-center p-3"
            style={{
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              width: "38%",
              top: "-100px",
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "10px",
            }}
          >
            <h2>من نحن</h2>
            <h4 className="w-75 mx-auto">
              نحن فريق من الأفراد الشغوفين الذين يسعون لدعم المزارعين المحليين
              والمنتجين الصغار والحرفيين. توفر منصتنا مساحة رقمية للمنتجين لعرض
              منتجاتهم، مع تمكين المستهلكين من الحصول على أفضل الخيارات الطازجة
              والصحية المتوفرة في منطقتهم
            </h4>
          </div>

          <div
            className="text-center position-relative"
            style={{ width: "46%", top: "-110px", left: "25px" }}
          >
            <img
              src={img3}
              alt="من نحن"
              className="w-100"
              style={{ height: "200px" }}
            />
          </div>
        </div>

        <div className="container w-100 d-flex justify-content-between align-items-center ">
          <div
            className="text-center position-relative"
            style={{ width: "51%", top: "-165px", left: "-130px" }}
          >
            <img
              src={img3}
              alt="من نحن"
              className="w-100"
              style={{ height: "200px" }}
            />
          </div>

          <div
            className="text-center p-3"
            style={{
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              width: "38%",
              top: "-222px",
              left: "10px",
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: "10px",
            }}
          >
            <h2>لماذا تختارنا؟</h2>
            <h4 className="w-75 mx-auto">
              الطزاجة مضمونة: استمتع بمنتجات يتم توصيلها مباشرة من المزرعة إلى
              باب منزلك. دعم المزارعين المحليين: من خلال اختيارك لنا، تساهم
              مباشرةً في تحسين حياة المنتجين المحليين{" "}
            </h4>
          </div>
        </div>

        <div
          className="text-center p-3"
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            width: "38%",
            top: "-222px",
            left: "10px",
            position: "relative",
            backgroundColor: "#fff",
            borderRadius: "10px",
          }}
        >
          <h2>ما الذى نقدمه ؟</h2>
          <h4 className="w-75 fs-3 mx-auto">
            ربط المستهلكين بالمنتجات المحلية عالية الجودة والطازجة. تمكين
            المزارعين والأعمال الصغيرة من الوصول إلى سوق أوسع.
          </h4>
        </div>
      </div>
    </>
  );
}
