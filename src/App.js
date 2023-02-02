import React, { createContext } from 'react';
import { useState } from 'react';
import useFetch from './component/useFecth';
import Question from './component/Question';
import OptionAnswer from './component/OptionAnswer';
import { numbers, } from './component/OptionAnswer';
import { asking, numberRandom } from './component/Question';
import { numbersRandom } from './component/OptionAnswer';
import worldIcon from "./img/world.svg";
import dataFile from "../data.json"
const ContContext = createContext();

function App() {
  const [cont, setCont] = useState(0);
  const [option, setOption] = useState(numbers());
  const [textQuestion, setTextQuestion] = useState(asking(numberRandom()));
  const [questionPosition, setQuestionPosition] = useState(numbersRandom())
  const [country, setCountry] = useState()
  const data = dataFile//useFetch('https://restcountries.com/v2/all');
  //console.table(data[0])
  return (
    <ContContext.Provider value={{ cont, setCont, option, setOption, textQuestion, setTextQuestion, data, country, setCountry, questionPosition, setQuestionPosition}}>
      <section className="App">
        <div className='title'>
          <h1>Country Quiz</h1>
          <img src={worldIcon} alt='world picture' className='iconWorld'/>  
        </div>
        <div className='questionSection'>
          <Question />
          <OptionAnswer />
        </div>
      </section>
    </ContContext.Provider>
  );
}
export { ContContext }

export default App;
