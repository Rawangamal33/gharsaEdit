import { Navigate } from "react-router"
// import Home from "../Home/Home"
import PropTypes from "prop-types";

export default function ProtectedRouting({children}) {
    if (localStorage.getItem("userToken") != null) {
        return children;
    } else {
        return <Navigate to ='/loginIn' />
    }
}
ProtectedRouting.propTypes = {
    children: PropTypes.node.isRequired,
};
