import React, { createContext , useState} from 'react';
import useFetch from './component/useFecth';
import Question from './component/Question';
import OptionAnswer from './component/OptionAnswer';
import { numbers, } from './component/OptionAnswer';
import { numbersRandom } from './component/OptionAnswer';
import worldIcon from "./img/world.svg";
import dataOffLine from "../data.json";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [dataAPI, error] = useFetch('https://restcountries.com/v3.1/all') || data;
  const continents = ["Africa", "Asia" ,"North America", "South America", "Antarctica", "Europe", "Oceania"];

  const data = error || !dataAPI ? dataOffLine : dataAPI;

  return (
    <ContContext.Provider value={{ cont, setCont, option, setOption, textQuestion, setTextQuestion, data, country, setCountry, questionPosition, setQuestionPosition, optionVerify, setOptionVerify, point, setPoint, continents, t}}>
      <section className="App">
        <div className='title'>
          <h1>Country Quiz</h1>
          <img src={worldIcon} id='iconWorld' alt='world picture' className='icon-World' />
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
