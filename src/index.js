import ReactDOM from "react-dom";
import App from "./App.tsx";
import Footer from "./component/Footer/Footer.tsx";
import LanguageSelector from "./component/LanguageSelector/LanguageSelector.tsx";
import "./assets/css/main.css";
import "./utils/i18n.ts";
import { AuthProvider } from "./context/AuthContext.tsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="body">
    <AuthProvider>
      <div className="language-controls-top">
        <LanguageSelector />
      </div>
      <App />
      <Footer />
    </AuthProvider>
  </div>
);
