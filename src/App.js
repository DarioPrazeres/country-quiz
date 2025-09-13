import React, { createContext, useState, useMemo } from "react";
import useFetch from "./hooks/useFecth";
import Question from "./component/Question/Question";
import OptionAnswer, { numbers, numbersRandom } from "./component/QuestionAnswer/OptionAnswer";
import Result from "./component/Result/Result";
import worldIcon from "./assets/img/world.svg";
import dataOffline from "./data/data.json";
import { useTranslation } from "react-i18next";

export const ContContext = createContext();

const CONTINENTS = [
  "Africa",
  "Asia",
  "North America",
  "South America",
  "Antarctica",
  "Europe",
  "Oceania",
];

function App() {
  const [cont, setCont] = useState(0);
  const [point, setPoint] = useState(0);
  const [option, setOption] = useState(numbers());
  const [questionPosition, setQuestionPosition] = useState(numbersRandom());
  const [showResult, setShowResult] = useState(false);
  const [played, setPlayed] = useState(0);
  const { t } = useTranslation();

  const [dataAPI, error] = useFetch("https://restcountries.com/v3.1/all");
  const data = error || !dataAPI ? dataOffline : dataAPI;

  const languages = useMemo(() => {
    return [
      ...new Set(
        data
          .filter((c) => c.languages)
          .flatMap((c) => Object.values(c.languages))
      ),
    ];
  }, [data]);

  const currencies = useMemo(() => {
    return [
      ...new Set(
        data
          .filter((c) => c.currencies)
          .flatMap((c) => Object.values(c.currencies).map((m) => m.name))
      ),
    ];
  }, [data]);

  currencies.push("No Currency")

  const subregions = useMemo(() => {
    return [
      ...new Set(data.filter((c) => c.subregion).map((c) => c.subregion)),
    ];
  }, [data]);

  return (
    <ContContext.Provider
      value={{
        cont,
        setCont,
        option,
        setOption,
        data,
        questionPosition,
        setQuestionPosition,
        point,
        setPoint,
        continents: CONTINENTS,
        t,
        showResult,
        played, 
        setPlayed,
        setShowResult, 
        languages,
        currencies,
        subregions,
      }}
    >
      <section className="App">
        <div className="title">
          <h1>Country Quiz</h1>
          <img
            className="icon-World"
            src={worldIcon}
            id="iconWorld"
            alt="World with a little Boy"
          />
        </div>

        {!showResult ? (
            <div className="questionSection">
              <Question />
              <OptionAnswer />
            </div>
          ) : (
            <Result point={point} />
          )}
      </section>
    </ContContext.Provider>
  );
}

export default App;
