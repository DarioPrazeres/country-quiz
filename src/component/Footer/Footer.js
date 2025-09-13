import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const linkGitHub = "https://github.com/DarioPrazeres";
  return (
    <footer>
      <p>
        {t("create_by")}<a href={{linkGitHub}}>Dario Prazeres</a>{" "}
        - <a href={{linkGitHub}}>DP Project</a>
      </p>
    </footer>
  );
}
