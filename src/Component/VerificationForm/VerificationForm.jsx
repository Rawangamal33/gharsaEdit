// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useContext, useState } from "react";
// import axios from "axios";
// import { Link, NavLink, useNavigate } from "react-router";
// import { TokenContext } from "../Context/TokenContext";
// import image from "../../assets/Rectangle 62.png"

// export default function SignIn() {
//     let { setToken } = useContext(TokenContext);
//     let [errMsg, setErr] = useState("");
//     let [loading,setloading] =useState(true)
//     let navg = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);

//     let validationSchema = Yup.object({
//       password: Yup.string()
//         .matches(/^[A-Z][a-z0-9A-Z!@#$%^&*()-_]{6,16}$/, "First letter uppercase digits sign more than 6 letters")
//         .required("Password is Required"),
//       rePassword: Yup.string().oneOf([Yup.ref("password")],"confirm pass is not matched").required("Repassord is required"),
//     });

//     let form1 = useFormik({
//       initialValues: {
//         rePassword: "",
//         password: "",
//       },
//       onSubmit: LoginApi,
//       validationSchema,
//     });

//       async function LoginApi(val) {
//           setloading(false)
//       let req = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", val).catch((err) => {
//         console.log(err);
//         setErr(err.response?.data?.message || "An error occurred");
//         setloading(true)
//       });

//         if (req?.data.message === "success") {
//           setloading(true)
//         localStorage.setItem("userToken", req.data.token);
//         setToken(req.data.token);
//         navg("/Home");
//       }
//       console.log(req);
//     }

//   return (
//       <>
//         <div
//         style={{
//           backgroundImage: `url("https://s3-alpha-sig.figma.com/img/2938/2f50/38a8c9408a443e8e165c7f1871e2782a?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HogbXLfgYF01cxrDRk7C27jcOIlJk~-5wEW3bzBcKf6fB81ZtUdJjZbN8raTVIUDgd8MHxyqiGWflBRakzd7utL4P8sEY~XIIt5VPNHRwzSe3ml-HsRM6ujGqs6ErsOyK5lsLl-vQvlZ7IV5ZBEtLHpKPKwCtjxbidPSDhW6iSkvbuk~gELQ68KvzPvRs~BjSZiGkKO4IbsHa6Czk9xwYBHRr7DRmigdzM5R2q-mVmx~t38bNqzJYNydLEWOkhZXGmKizPqRXXo9LrKFyC3B6Z8Evs6VJwD3cA96PXq6IuOtyGGrFFdl4-v7GmywEkbRSKqp0dJYGAooXv-L1b1uyg__")`,
//           backgroundSize: "cover",
//           backgroundAttachment: "fixed",
//           minHeight: "100vh",
//           width: "100%",
//           overflow: "hidden",
//         }}
//           >
//                       <div className="container-fluid my-4 d-flex ">
//                       <Link className="navbar-brand w-25" to='/Home'><img src={image} alt="logo" style={{width:"90%"}} /></Link>
//                   <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                   </button>

//                         <nav className="bg-light px-5 rounded-pill navbar navbar-expand-lg bg-body-tertiary" style={{ width: "50%" }}>
//                           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                             <ul className="navbar-nav d-flex list-unstyled m-0 justify-content-between w-100">
//                               <li className="nav-item">
//                                 <NavLink to="about" className={({isActive})=>isActive == true ? "nav-link test" :"nav-link text-success fs-5"}>من نحن</NavLink>
//                               </li>
//                               <li className="nav-item">
//                                 <NavLink to="Home" className={({isActive})=>isActive == true ? "nav-link test" :"nav-link text-success fs-5 "}>تواصل معنا</NavLink>
//                               </li>
//                               <li className="nav-item">
//                                 <NavLink to="" className={({isActive})=>isActive == true ? "nav-link test rounded-pill fs-5 px-4" :"nav-link text-success fs-5"}>إنضم إلينا</NavLink>
//                               </li>
//                               <li className="nav-item">
//                                 <NavLink to="/Home" className={({isActive})=>isActive == true ? "nav-link test" :"nav-link text-success fs-5"}>الصفحة الرئيسية</NavLink>
//                               </li>
//                             </ul>
//                           </div>
//                         </nav>
//                       </div>
//               <div className="containerall">
//                   <div className="container  p-5 my-5 bg-white opacity-75 " style={{borderRadius:"30px",width:"40%"}}>
//                       <div className="my-3 text-center">
//                           <img src={image} alt="photo" />
//                       </div>
//             <div className="text-center">
//       <form>

//       <div className="py-3 mx-auto text-end " style={{width:"65%"}}>
//         <label htmlFor="password" className="py-2">كلمة المرور</label>
//                       <div className="d-flex justify-content-center">
//           <div className="position-relative input-container" style={{ width: "420px" }}>
//             <input
//               onBlur={form1.handleBlur}
//               onChange={form1.handleChange}
//               className="form-control"
//               type={showPassword ? "text" : "password"}
//               name="password"
//               id="password"
//               style={{
//                 paddingRight: "40px",
//                 border: "none",
//                 borderBottom: "2px solid grey",
//                 backgroundColor: "transparent",
//               }}
//             />
//             <i
//               className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} position-absolute`}
//               style={{
//                 right: "10px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 cursor: "pointer",
//                 fontSize: "18px",
//                 color: "#6c757d",
//               }}
//               onClick={() => setShowPassword((prev) => !prev)}
//             ></i>
//           </div>
//         </div>
//                       {form1.errors.password && form1.touched.password && (
//                         <div className="alert alert-danger">{form1.errors.password}</div>
//                       )}

//         </div>

//         <div className="py-3 mx-auto text-end " style={{width:"65%"}}>
//         <label htmlFor="rePassword" className="py-2"> تأكيد كلمة المرور </label>
//                       <div className="d-flex justify-content-center">
//           <div className="position-relative input-container" style={{ width: "420px" }}>
//             <input
//               onBlur={form1.handleBlur}
//               onChange={form1.handleChange}
//               className="form-control"
//               type={showPassword ? "text" : "password"}
//               name="rePassword"
//               id="rePassword"
//               style={{
//                 paddingRight: "40px",
//                 border: "none",
//                 borderBottom: "2px solid grey",
//                 backgroundColor: "transparent",
//               }}
//             />
//             <i
//               className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} position-absolute`}
//               style={{
//                 right: "10px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 cursor: "pointer",
//                 fontSize: "18px",
//                 color: "#6c757d",
//               }}
//               onClick={() => setShowPassword((prev) => !prev)}
//             ></i>
//           </div>
//         </div>
//                       {form1.errors.rePassword && form1.touched.rePassword && (
//                         <div className="alert alert-danger">{form1.errors.rePassword}</div>
//                       )}

//         </div>

//         {errMsg !== "" && <div className="alert alert-danger">{errMsg}</div>}
//         </form>

//                   {loading ?<button
//                     disabled={!(form1.isValid && form1.dirty)}
//                     type="submit"
//                     onClick={form1.handleSubmit}
//                     className="rounded text-white my-5 fs-4"
//                     style={{width: "220px",border:"none",height: "60px", backgroundColor: "#64b356",fontWeight:"bold"}}
//                   >
//                     حفظ
//                   </button>

//                   :<button type="button" className="btn  text-white mx-2 ">
//                   <i className="fa-solid fa-spinner fa-spin"></i>
//                   </button>}
//                       </div>
//                   </div>
//                           </div>
//         </div>

//       </>
//   )
// }
