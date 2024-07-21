import React, { useContext } from "react";
import { ContContext } from "../App";
import { numberRandom } from "./Question";

var IndexContinents = null;
var continentSelected = null;

function OptionAnswer() {
  const { option, setOption, data, setCont, cont, questionPosition, setQuestionPosition, setPoint, continents } = useContext(ContContext);

  if (cont === 4) {
    continentSelected = continents.indexOf(data[questionPosition].continents[0]);
    IndexContinents = getArrayWithNumber(continentSelected);
  }

  function controlOption() {
    setOption(numbers());
    setCont(numberRandom()); 
  }

  function optionText(valuePos) {
    if (!data) return '';

    const country = data[valuePos];
    if (!country) return '';
    const optionTerritorial = Number(country.area).toLocaleString('pt') + ' Km²';
    const optionCountryName = country.name ? country.name.common : '';
    const optionNameContinent = continents[valuePos];
    const optionNumberPopulation = Number(country.population).toLocaleString('pt');
    switch (cont) {
      case 2:
        return optionTerritorial || Number(10000).toLocaleString('pt');
      case 3:
        return optionNumberPopulation;
      case 4:
        return optionNameContinent;
      default:
        return optionCountryName;
    }
  }

  function updateButton(value, id) {
    document.getElementById('nextQuestion').style.height = '550px';
    document.getElementById('next').style.display = 'block';
    let correct = null;

    if (cont === 4) {
      correct = ValidAnswerContinent(continents, id, continentSelected);
    } else {
      correct = correctAnswer(showOption(cont, option[value], questionPosition), questionPosition, cont);
    }

    if (correct) {
      document.getElementById(id).classList.add("correct");
      document.getElementById(id).classList.remove("neutro");
      setPoint(c => c + 1);
    } else {
      document.getElementById(id).classList.add("incorrect");
      document.getElementById(id).classList.remove("neutro");
      showCorrect();
    }

    bloquearOutrosBotoes(true);
  }

  function bloquearOutrosBotoes(status) {
    for (let i = 0; i < 4; i++) {
      document.getElementById(`option-${i}`).disabled = status;
    }
  }

  function showCorrect() {
    for (let i = 0; i < 4; i++) {
      const optionCorrect = document.getElementById(`option-${i}`);
      if (optionCorrect) {
        let continentSelectedText = optionCorrect.querySelector("p").textContent;
        if (cont === 4) {
          if (continents[continentSelected] === continentSelectedText) {
            optionCorrect.classList.add("correct");
            optionCorrect.classList.remove("neutro");
          }
        } else {
          if (option[i] === 0) {
            optionCorrect.classList.add("correct");
            optionCorrect.classList.remove("neutro");
          }
        }
      }
    }
  }

  return (
    <div className="option">
      {option.map((opt, index) => (
        <button
          key={index}
          id={`option-${index}`}
          className={`option-${index} neutro`}
          onClick={() => {
            updateButton(index, `option-${index}`);
          }}
        >
          <p id={`p-${index}`}>{optionText(showOption(cont, opt, questionPosition))}</p>
        </button>
      ))}

      <button
        id="next"
        className="nextQuestion"
        onClick={() => {
          localStorage.setItem("played", Number(localStorage.getItem("played")) + 1);
          if (Number(localStorage.getItem("played")) >= 5) {
            localStorage.setItem("played", 0);
            document.getElementById('result').style.display = "flex";
            document.getElementById('nextQuestion').style.display = "none";
            document.getElementById('iconWorld').style.display = "none";
          }
          for (let i = 0; i < 4; i++) {
            document.getElementById(`option-${i}`).classList.remove("incorrect");
            document.getElementById(`option-${i}`).classList.remove("correct");
            document.getElementById(`option-${i}`).classList.add("neutro");
          }
          document.getElementById('next').style.display = 'none';
          document.getElementById('nextQuestion').style.height = '500px';
          setQuestionPosition(numbersRandom());
          controlOption();
          bloquearOutrosBotoes(false);
        }}
      >
        Next
      </button>
    </div>
  );
}

function showOption(cont, pos, currentPosition) {
  if (cont === 4) {
    return IndexContinents[pos];
  } else {
    if (currentPosition + 4 >= 250) {
      return currentPosition - pos;
    } else {
      return currentPosition + pos;
    }
  }
}

function numbers() {
  return Array(4).fill().map((a, i) => a = i).sort(() => Math.random() - 0.5);
}

function numbersRandom() {
  return Math.floor(Math.random() * 250);
}

function ValidAnswerContinent(continentArray, IdObject, positionCorrect) {
  const optionId = document.getElementById(IdObject);
  let continentSelected = optionId.querySelector("p").textContent;
  return continentArray[positionCorrect] === continentSelected;
}

function correctAnswer(position, corectPosition, cont) {
  if (cont === 4) {
    return IndexContinents[position] === corectPosition;
  }
  return position === corectPosition;
}

function getArrayWithNumber(number) {
  const size = 4;
  const values = [0, 1, 2, 3, 4, 5, 6];
  const result = [];

  const possibleValues = values.filter(val => val !== number);

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
