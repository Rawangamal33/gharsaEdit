import { NavLink } from "react-router";
import photo from "../../../assets/Woman buying food on eco-friendly farmers market.png";
const JoinUs = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            color: "#6bb05f",
            fontSize: "1.4rem",
            fontWeight: "500",
            marginRight: "1vh",
            width: "37vw",
          }}
        >
          "انضم كبائع الآن وابدأ بعرض منتجاتك للمستهلكين المحليين بسهولة, مع دعم
          مستدام يزيد من أرباحك ويعزز انتشارك"
        </p>
        <NavLink
          to="/loginIn"
          style={{
            background: "#6bb05f",
            color: "white",
            fontSize: "1.2rem",
            padding: "10px 3px 10px 3px",
            textAlign: "center",
            width: "120px",
            borderRadius: "5px",
            boxShadow: "2px 2px 9px -3px #333",
            margin: "50px 0 0 0",
          }}
        >
          انضم الآن
        </NavLink>
      </div>
      <img
        src={photo}
        style={{
          width: "300px",
        }}
      />
    </div>
  );
};
export default JoinUs;
