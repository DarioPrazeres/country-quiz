import React, { createContext, useState, useMemo } from "react";
import useFetch from "./component/useFecth";
import Question from "./component/Question";
import OptionAnswer, { numbers, numbersRandom } from "./component/OptionAnswer";
import Result from "./component/Result";
import worldIcon from "./img/world.svg";
import dataOffline from "../data.json";
import { useTranslation } from "react-i18next";

export const ContContext = createContext();

// constante global, não precisa recriar a cada render
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
  const { t } = useTranslation();

  const [dataAPI, error] = useFetch("https://restcountries.com/v3.1/all");
  const data = error || !dataAPI ? dataOffline : dataAPI;

  const languages = useMemo(() => {
    return [
      ...new Set(
        data
          .filter((c) => c.languages)
          .map((c) => Object.values(c.languages)[0])
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
            alt="World Picture with a little Boy"
          />
        </div>

        <div id="nextQuestion" className="questionSection">
          <Question />
          <OptionAnswer />
        </div>

        <Result point={point} />
      </section>
    </ContContext.Provider>
  );
}

export default App;
