import React, { useContext } from "react";
import { ContContext } from "../../App";
import cupIcon from "../../assets/img/cup.svg";

function Result({ point }) {
  const { setPoint, setShowResult, t } = useContext(ContContext);

  function handleTryAgain() {
    localStorage.clear();
    setPoint(0);
    setShowResult(false); 
  }

  return (
    <div className="result">
      <img src={cupIcon} alt="trophy" />
      <h1>{t("results")}</h1>
      <p>
        {t("you_got")} <span>{point}</span> {t("correct")}
      </p>
      <button onClick={handleTryAgain}>{t("try_again")}</button>
    </div>
  );
}

export default Result;
