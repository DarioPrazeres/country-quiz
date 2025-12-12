import React, { useContext, useState, useCallback } from "react";
import { ContContext } from "../../App.tsx";
import CountryMap from "../CountryMap/CountryMap.tsx";
import { Timer } from "../Timer/Timer.tsx";
import { QuestionType } from "../QuizType/QuizType.tsx";
import { useTimer } from "../../hooks/useTimer.tsx";
import {  AskingProps, ContContextType } from "../../types/index.ts";

function Question() {
  const { questionPosition, cont, data, t, answered, setAnswered } =
    useContext(ContContext) as ContContextType;

  const handleTimeUp = useCallback(() => {
    if (!answered) {
      setAnswered(true);
    }
  }, [answered, setAnswered]);

  const timeLeft = useTimer({
    initialTime: 15,
    questionPosition,
    answered,
    onTimeUp: handleTimeUp,
  });

  return (
    <div className="question-section">
      <div className="question-header">
        <Timer timeLeft={timeLeft} />
        <QuestionType type={cont} />
      </div>

      <div className="question-content">
        <Asking
          countries={data}
          value={cont}
          pos={questionPosition}
          traslate={t}
        />
      </div>
    </div>
  );
}


function Asking({ countries, value, pos, traslate }: AskingProps) {
  if (!countries || !countries[pos]) {
    return (
      <div className="question-error">
        <p className="question-p">Error: Country data not available</p>
      </div>
    );
  }

  const country = countries[pos];
  const capital = country.capital?.[0]; 
  const name = country.name.common;
  const url = country.flags.png;
  const currency = country.currencies;
  const latlng = country.latlng;

  if (!name) {
    return (
      <div className="question-error">
        <p className="question-p">Country information incomplete</p>
      </div>
    );
  }

  switch (value) {
    case 0:
      if (!capital) {
        return <p className="question-p">{traslate("question_continent", { country: name })}</p>;
      }
      return (
        <div className="question-container">
          <p className="question-p">{traslate("question_capital", { capital })}</p>
        </div>
      );

    case 1:
      return (
        <div className="question-container">
          <div className="media-container">
            <img className="imgFlag" src={url} alt={`Flag of ${name}`} />
          </div>
          <p className="question-p">{traslate("question_flag")}</p>
        </div>
      );

    case 2:
      return (
        <div className="question-container">
          <p className="question-p">{traslate("question_territory", { country: name })}</p>
        </div>
      );

    case 3:
      return (
        <div className="question-container">
          <p className="question-p">{traslate("question_population", { country: name })}</p>
        </div>
      );

    case 4:
      return (
        <div className="question-container">
          <p className="question-p">{traslate("question_region", { country: name })}</p>
        </div>
      );

    case 5:
      return (
        <div className="question-container">
          <p className="question-p">{traslate("question_language", { country: name })}</p>
        </div>
      );

    case 6:
      if (!currency) {
        return <p className="question-p">{traslate("question_continent", { country: name })}</p>;
      }
      return (
        <div className="question-container">
          <p className="question-p">{traslate("question_currency", { country: name })}</p>
        </div>
      );

    case 7:
      return (
        <div className="question-container">
          <p className="question-p">{traslate("question_continent", { country: name })}</p>
        </div>
      );

    case 8:
      if (!latlng || latlng.length !== 2) {
        return <p className="question-p">{traslate("question_continent", { country: name })}</p>;
      }
      return (
        <div className="question-container">
          <p className="question-p">{traslate("question_map", { country: name })}</p>
          <CountryMap latlng={latlng} name={name} />
        </div>
      );

    case 9:
      return (
        <div className="question-container">
          <p className="question-p">{traslate("question_borders", { country: name })}</p>
        </div>
      );

    default:
      return (
        <div className="question-container">
          <p className="question-p">{traslate("question_continent", { country: name })}</p>
        </div>
      );
  }
}

export default Question;