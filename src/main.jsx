import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/index.jsx";
import { TokenContextProvider } from "./Component/Context/TokenContext.jsx";

createRoot(document.getElementById("root")).render(
  
    <TokenContextProvider>
  <Provider store={store}>
    <App />
  </Provider>
  </TokenContextProvider>

);
