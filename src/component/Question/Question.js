import React from "react";
import { useContext } from "react";
import { ContContext } from "../../App";
import CountryMap from "../CountryMap/CountryMap";

function Question() {
  const { questionPosition, cont, data, t } = useContext(ContContext);
  return (
    <div>
      <Asking
        countries={data}
        value={cont}
        pos={questionPosition}
        traslate={t}
      />
    </div>
  );
}
function numberRandom() {
  return Math.floor(Math.random()*9);
}

function Asking(props) {
  var capital, name, url, currency;
  var pos = props.pos;
  var countries = props.countries;
  var value = props.value;
  const t = props.traslate;
  countries &&
    countries.forEach((e, i) => {
      if (i === pos) {
        capital = e.capital;
        name = e.name.common;
        url = e.flags.png;
        currency = e.currencies;
      }
    });
  if (capital === undefined || currency === undefined) {
    value++;
  }

  switch (value) {
    case 0:
      return (
        <p className="question-p">
          {" "}
          {t("question_capital", { capital: capital })}{" "}
        </p>
      );
    case 1:
      return (
        <div className="dp">
          <img className="imgFlag" src={url} alt="flag" />
          <p className="question-p"> {t("question_flag")}</p>
        </div>
      );
    case 2:
      return (
        <p className="question-p">
          {" "}
          {t("question_territory", { country: name })}
        </p>
      );
    case 3:
      return (
        <p className="question-p">
          {" "}
          {t("question_population", { country: name })}
        </p>
      );
    case 4:
      return (
        <p className="question-p"> {t("question_region", { country: name })}</p>
      );
    case 5:
      return (
        <p className="question-p">
          {" "}
          {t("question_language", { country: name })}
        </p>
      );
    case 6:
      return (
        <p className="question-p">
          {" "}
          {t("question_currency", { country: name })}
        </p>
      );
    case 8:
      return (
        <div className="dp">
            <p className="question-p">{t("question_map", { country: name })}</p>
            <CountryMap latlng={countries[pos].latlng} name={name} />
        </div>
      );
    case 9:
      return (
        <p className="question-p">
          {" "}
          {t("question_borders", { country: name })}
        </p>
      );
    default:
      return (
        <p className="question-p">
          {" "}
          {t("question_continent", { country: name })}
        </p>
      );
  }
}

export { numberRandom };
export default Question;
