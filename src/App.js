import React, { createContext } from 'react';
import { useState} from 'react';
import useFetch from './component/useFecth';
import Question from './component/Question';
import OptionAnswer from './component/OptionAnswer';
import { numbers, } from './component/OptionAnswer';
import { numbersRandom } from './component/OptionAnswer';
import worldIcon from "./img/world.svg";

const ContContext = createContext();
import Result from './component/Result';
function App() {
  const [cont, setCont] = useState(0);
  const [point, setPoint] = useState(0);
  const [option, setOption] = useState(numbers());
  const [optionVerify, setOptionVerify] = useState([]);
  const [textQuestion, setTextQuestion] = useState();
  const [questionPosition, setQuestionPosition] = useState(numbersRandom())
  const [country, setCountry] = useState()
  const [data] = useFetch('https://restcountries.com/v2/all');

  return (
    <ContContext.Provider value={{ cont, setCont, option, setOption, textQuestion, setTextQuestion, data, country, setCountry, questionPosition, setQuestionPosition, optionVerify, setOptionVerify, point, setPoint}}>
      <section className="App">
        <div className='title'>
          <h1>Country Quiz</h1>
          <img src={worldIcon} id='iconWorld' alt='world picture' className='iconWorld' />
        </div>
        <div id='nextQuestion' className='questionSection'>
          <Question />
          <OptionAnswer />
        </div>
        <Result point={point}/>
      </section>
    </ContContext.Provider>
  );
}

export { ContContext }

export default App;
