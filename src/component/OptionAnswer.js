import React, { useContext, useMemo, useState } from "react";
import { ContContext } from "../App";
import { numberRandom } from "./Question";

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
    currencies
  } = useContext(ContContext);

  const [selected, setSelected] = useState(null); 
  const [answered, setAnswered] = useState(false); 

  const continentSelected = useMemo(() => {
    if (cont === 7 && data[questionPosition]) {
      return continents.indexOf(data[questionPosition].continents[0]);
    }
    return null;
  }, [cont, questionPosition, data, continents]);

  const indexContinents = useMemo(() => {
    if (continentSelected !== null) {
      return getArrayWithNumber(continentSelected, continents.length);
    }
    return [];
  }, [continentSelected]);

  const subregionSelected = useMemo(() => {
    if (cont === 4 && data[questionPosition]) {
      return subregions.indexOf(data[questionPosition].subregion);
    }
    return null;
  }, [cont, questionPosition, data, subregions]);

  const indexSubregions = useMemo(() => {
    if (subregionSelected !== null) {
      return getArrayWithNumber(subregionSelected, subregions.length);
    }
    return [];
  }, [subregionSelected]);

  const languagesSelected = useMemo(() => {
    if (cont === 5 && data[questionPosition] && data[questionPosition].languages) {
      const langs = Object.values(data[questionPosition].languages); 
      const randomLang = langs[Math.floor(Math.random() * langs.length)]; 
      return languages.indexOf(randomLang); 
    }
    return null;
  }, [cont, questionPosition, data, languages]);

  const indexLanguages = useMemo(() => {
    if (languagesSelected !== null) {
      return getArrayWithNumber(languagesSelected, languages.length);
    }
    return [];
  }, [languagesSelected]);

  const currencySelected = useMemo(() => {
    if (cont === 6 && data[questionPosition] && data[questionPosition].currencies) {
      const coins = Object.values(data[questionPosition].currencies); 
      const randomCoin = coins[Math.floor(Math.random() * coins.length)]; 
      return currencies.indexOf(randomCoin); 
    }
    return "No Currency";
  }, [cont, questionPosition, data, languages]);

  const indexCurrencies = useMemo(() => {
    if (currencySelected !== null) {
      return getArrayWithNumber(currencySelected, currencies.length);
    }
    return [];
  }, [currencySelected]);


  function getOptionText(valuePos) {
    const country = data[valuePos];
    if (!country) return "";

    switch (cont) {
      case 2:
        return `${Number(country.area).toLocaleString("pt")} Km²`;
      case 3:
        return Number(country.population).toLocaleString("pt");
      case 4:
        return subregions[valuePos];
      case 7:
        return continents[valuePos];
      case 5:
        return languages[valuePos];
      case 6: {
        const currencyCode = country.currencies
          ? Object.keys(country.currencies)[0]
          : "";
        return currencyCode ? country.currencies[currencyCode].name : "";
      }
      default:
        return country.name.common || "";
    }
  }

  function showOption(cont, pos, currentPosition) {
    if (cont === 7) {
      return indexContinents[pos];
    } 
    else if (cont === 5) {
      return indexLanguages[pos];
    }
    else if (cont === 4) {
      return indexSubregions[pos];
    }
    else {
      if (currentPosition + 4 >= 250) {
        return currentPosition - pos;
      } else {
        return currentPosition + pos;
      }
    }
  }

  function handleSelect(index) {
    if (answered) return; 
    
    const chosenIndex = showOption(cont, option[index], questionPosition);
    const isCorrect =
      cont === 7 ? chosenIndex === continentSelected : 
      cont === 5 ? chosenIndex === languagesSelected : 
      cont === 4 ? chosenIndex === subregionSelected : chosenIndex === questionPosition;

    setSelected(index);
    setAnswered(true);

    if (isCorrect) {
      setPoint((c) => c + 1);
    }
  }

  function nextQuestion() {
    setQuestionPosition(numbersRandom());
    setOption(numbers());
    setCont(numberRandom());
    setSelected(null);
    setAnswered(false);
    if (played + 1 >= 5) {
      setShowResult(true);   
      setPlayed(0);          
      return;
    }
    else setPlayed(played + 1);
  }

  return (
    <div className="option">
      {option.map((opt, index) => {
        const valuePos = showOption(cont, opt, questionPosition);
        const text = getOptionText(valuePos);

        const isChosen = selected === index;
        const isCorrect =
          cont === 7
            ? valuePos === continentSelected
            : cont === 5 ? valuePos === languagesSelected 
            : cont === 4 ? valuePos === subregionSelected 
            : valuePos === questionPosition;

        let className = "neutro";
        if (answered) {
          if (isCorrect) className = "correct";
          else if (isChosen) className = "incorrect";
        }

        return (
          <button
            key={index}
            className={`option-${index} ${className}`}
            onClick={() => handleSelect(index)}
            disabled={answered}
          >
            <p>{text}</p>
          </button>
        );
      })}

      {answered && (
        <button className="nextQuestion" onClick={nextQuestion}>
          Next
        </button>
      )}
    </div>
  );
}

function numbers() {
  return Array(4)
    .fill()
    .map((_, i) => i)
    .sort(() => Math.random() - 0.5);
}

function numbersRandom() {
  return Math.floor(Math.random() * 250);
}

function getArrayWithNumber(number, length) {
  const size = 4;
  const values = [];
  const result = [];

  for(let i = 0; i < length; i++) {
    values.push(i);
  }
  const possibleValues = values.filter((val) => val !== number);

  while (result.length < size - 1) {
    const randomIndex = Math.floor(Math.random() * possibleValues.length);
    const randomValue = possibleValues[randomIndex];
    if (!result.includes(randomValue)) {
      result.push(randomValue);
    }
  }
  const randomPosition = Math.floor(Math.random() * size);
  result.splice(randomPosition, 0, number);

  return result;
}

export { numbers, numbersRandom };
export default OptionAnswer;
