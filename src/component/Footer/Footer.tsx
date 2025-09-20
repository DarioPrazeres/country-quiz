import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const linkGitHub: string = "https://github.com/DarioPrazeres";

  return (
    <footer>
      <p>
        {t("create_by")}{" "}
        <a href={linkGitHub} target="_blank" rel="noopener noreferrer">
          Dario Prazeres
        </a>{" "}
        -{" "}
        <a href={linkGitHub} target="_blank" rel="noopener noreferrer">
          DP Project
        </a>
      </p>
    </footer>
  );
}
