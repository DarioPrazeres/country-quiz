import React, { useContext, useEffect, useState, useCallback } from "react";
import { ContContext } from "../../App.tsx";
import { useTimer } from "../../hooks/useTimer.tsx";
import {generateRandomOrder, generateRandomQuestionPosition,  numberRandom as questionNumberRandom } from "../../utils/gameUtils.ts";
import {isCorrectAnswer, getOptionText, getOptionValue} from "../../utils/optionHelpers.ts";
import { ContContextType} from "../../types";
import {useQuestionLogic} from "../../hooks/useQuestionLogic.ts";
import {OptionButton} from "../OptionButton/OptionButton.tsx";


function OptionAnswer() {
  const {
    option,
    setOption,
    data,
    setCont,
    cont,
    questionPosition,
    setQuestionPosition,
    played,
    setShowResult,
    setPlayed,
    setPoint,
    continents,
    languages,
    subregions,
    currencies,
    timeLeft,
    answered,
    setAnswered,
  } = useContext(ContContext) as ContContextType;

  const [selected, setSelected] = useState<number | null>(null);

  // Reset state on question change
  useEffect(() => {
    setSelected(null);
    setAnswered(false);
  }, [questionPosition, setAnswered]);

  const questionLogic = useQuestionLogic({
    cont,
    questionPosition,
    data,
    continents,
    languages,
    subregions,
    currencies,
  });

  const nextQuestion = useCallback(() => {
    setSelected(null);
    setAnswered(false);

    setQuestionPosition(generateRandomQuestionPosition());
    setOption(generateRandomOrder());
    setCont(questionNumberRandom());

    if (played + 1 >= 5) {
      setShowResult(true);
      setPlayed(0);
    } else {
      setPlayed(played + 1);
    }
  }, [played, setQuestionPosition, setOption, setCont, setShowResult, setPlayed, setAnswered]);

  const handleSelect = useCallback(
    (index: number) => {
      if (answered) return;

      const chosenIndex = getOptionValue(
        cont,
        option[index],
        questionPosition,
        questionLogic.indexContinents,
        questionLogic.indexLanguages,
        questionLogic.indexSubregions,
        questionLogic.indexCurrencies,
        questionLogic.indexBorders
      );

      const correct = isCorrectAnswer(
        chosenIndex,
        cont,
        questionLogic.continentSelected,
        questionLogic.languagesSelected,
        questionLogic.subregionSelected,
        questionLogic.currencySelected,
        questionLogic.borderSelected,
        questionPosition
      );

      setSelected(index);
      setAnswered(true);

      if (correct) setPoint((c) => c + 1);
    },
    [answered, cont, option, questionPosition, questionLogic, setPoint, setAnswered]
  );

  return (
    <div className="option">
      {option.map((opt, index) => {
        const valuePos = getOptionValue(
          cont,
          opt,
          questionPosition,
          questionLogic.indexContinents,
          questionLogic.indexLanguages,
          questionLogic.indexSubregions,
          questionLogic.indexCurrencies,
          questionLogic.indexBorders
        );

        const text = getOptionText(
          valuePos,
          cont,
          data,
          continents,
          languages,
          subregions,
          currencies
        );

        const isChosen = selected === index;
        const correct = isCorrectAnswer(
          valuePos,
          cont,
          questionLogic.continentSelected,
          questionLogic.languagesSelected,
          questionLogic.subregionSelected,
          questionLogic.currencySelected,
          questionLogic.borderSelected,
          questionPosition
        );

        return (
          <OptionButton
            key={`${questionPosition}-${index}`}
            index={index}
            text={text}
            isChosen={isChosen}
            isCorrect={correct}
            answered={answered}
            onClick={() => handleSelect(index)}
          />
        );
      })}

      {answered && (
        <button className="nextQuestion" onClick={nextQuestion}>
          {timeLeft <= 0 ? "Continue" : "Next"}
        </button>
      )}
    </div>
  );
}

export default OptionAnswer;