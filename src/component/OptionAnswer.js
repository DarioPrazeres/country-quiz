import React, { useContext } from "react";
import { ContContext } from "../App";
import { numberRandom } from "./Question";

function OptionAnswer() {
  const { option, setOption, data, setCont, cont, questionPosition, setQuestionPosition, setPoint } = useContext(ContContext);

  function controlOption() {
    setOption(numbers());
    setCont(4); //numberRandom()
  }
  function optionText(valuePos) {
    console.log(valuePos)
    if (!data) return '';

    const country = data[valuePos];
    if (!country) return '';

    const optionTerritorial = Number(country.area).toLocaleString('pt') + ' Km²';
    const optionCountryName = country.name ? country.name.common : '';
    const optionNameContinent = country.continents ? country.continents[0] : country.region;
    const optionNumberPopulation = Number(country.population).toLocaleString('pt');
    switch (cont) {
      /* case 0:
      case 1:
        return optionCountryName;*/
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
    const correct = corectAnswer(showOption(data, option[value], questionPosition), questionPosition);
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
      if(option[i] === 0) {
        optionCorrect.classList.add("correct");
        optionCorrect.classList.remove("neutro");        
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
          <p id={`p-${index}`}>{optionText(showOption(data, opt, questionPosition))}</p>
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

function showOption(array, pos, currentPosition) {
  if (currentPosition + 4 >= 250) {
    return currentPosition - pos;
  } else {
    return currentPosition + pos;
  }
}

function numbers() {
    return Array(4).fill().map((a, i) => a = i).sort(() => Math.random() - 0.5)
}

function numbersRandom() {
  return Math.floor(Math.random() * 250);
}

function corectAnswer(position, corectPosition) {
  return position === corectPosition;
}

export { numbers, numbersRandom };
export default OptionAnswer;
