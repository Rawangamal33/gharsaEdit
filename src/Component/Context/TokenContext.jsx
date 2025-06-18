// هشفر التوكين على ت ة ف علشان لما يعمل لوجين يسمع فى الموقع كله
// import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export let TokenContext = createContext();

export function TokenContextProvider({ children }) {
    let [userToken, setToken] = useState(null);
    let data = null
    if (userToken != null) {
        data = jwtDecode(userToken)
        console.log(data);
        
    }
    return (
        <TokenContext.Provider value={{data, userToken, setToken }}>
            {children}
        </TokenContext.Provider>
    );
}

TokenContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

