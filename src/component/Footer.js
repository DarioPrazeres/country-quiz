import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const userName = "Dário";
  return (
    <footer>
      <div>
        <h1>{t("welcome", { name: userName })}</h1>
        <button onClick={() => changeLanguage("en")}>English</button>
        <button onClick={() => changeLanguage("pt")}>Português</button>
      </div>
      <p>
        Created by <a href="https://github.com/DarioPrazeres">Dario Prazeres</a>{" "}
        - <a href="https://github.com/DarioPrazeres">DP Project</a>
      </p>
    </footer>
  );
}
