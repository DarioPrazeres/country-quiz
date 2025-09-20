import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "../../types";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages: Language[] = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "pt", name: "Português", flag: "🇧🇷" },
  ];

  const changeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="language-selector">
      <select
        value={i18n.language}
        onChange={changeLanguage}
        className="language-select"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
