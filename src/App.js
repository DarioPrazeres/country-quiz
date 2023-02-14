import React, { createContext } from 'react';
import { useState, useContext } from 'react';
import useFetch from './component/useFecth';
import Question from './component/Question';
import OptionAnswer from './component/OptionAnswer';
import { numbers, } from './component/OptionAnswer';
import { numberRandom } from './component/Question';
import { numbersRandom } from './component/OptionAnswer';
import worldIcon from "./img/world.svg";
import cupIcon from "./img/cup.svg"
import dataFile from "../data.json"
const ContContext = createContext();

function App() {
  const [cont, setCont] = useState(0);
  const [played, setPlayed] = useState(1);
  const [point, setPoint] = useState(0);
  const [option, setOption] = useState(numbers());
  const [optionVerify, setOptionVerify] = useState([]);
  const [textQuestion, setTextQuestion] = useState();
  const [questionPosition, setQuestionPosition] = useState(numbersRandom())
  const [country, setCountry] = useState()
  const [data] = useFetch('https://restcountries.com/v2/all');
  //console.log(data)
  return (
    <ContContext.Provider value={{ cont, setCont, option, setOption, textQuestion, setTextQuestion, data, country, setCountry, questionPosition, setQuestionPosition, optionVerify, setOptionVerify, point, setPoint, played, setPlayed }}>
      <section className="App">
        <div className='title'>
          <h1>Country Quiz Jogada:{played} Point :{point}</h1>
          <img src={worldIcon} id='iconWorld' alt='world picture' className='iconWorld' />
        </div>
        <div id='nextQuestion' className='questionSection'>
          <Question />
          <OptionAnswer />
        </div>
        <Result point={point} />
      </section>
    </ContContext.Provider>
  );
}
function Result() {
  const { point, setPoint, played, setPlayed } = useContext(ContContext);
  return (
    <div id='result' className='result'>
      <img src={cupIcon} />
      <h1>Results</h1>
      <p>You got <span>{point}</span> correct answers</p>
      <button id='tryAgain' onClick={() => {
        console.log(played)
        console.log(point)
        console.log('RESET');

        setPoint((c) => c = 0)
        setPlayed((c) => c = 1)
        console.log(point)
        console.log(played)
        document.getElementById('nextQuestion').style.display = "block";
        document.getElementById('iconWorld').style.display = "none";
        document.getElementById('result').style.display = "none";

      }}>Try again</button>
    </div>
  )
}
export { ContContext }

export default App;
