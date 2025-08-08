import React from "react";
import { useContext } from "react";
import { ContContext } from "../App";

function Question() {
    const {questionPosition, cont, data, t} = useContext(ContContext);
    return (
        <div>
            <Asking countries={data} value={cont} pos={questionPosition} traslate = {t}/>
        </div>
    )
}
function numberRandom(){
  return Math.floor(Math.random()*5);
}

function Asking(props) {
    var capital, name, url;
    var pos = props.pos;
    var countries = props.countries;
    var value = props.value;
    const  t  = props.traslate;
    countries && countries.map((e, i) => {        
        if (i === pos) {
            capital = e.capital;
            name = e.name.common;
            url = e.flags.png;
        }
    })
    if(capital=== undefined){
        value ++;
    }
    
    switch (value) {
        case 0:
            return <p className="question-p"> {t("question_capital", {capital: capital})} </p>;
        case 1:
            return (
                <div className="dp">
                    <img className="imgFlag" src={url} alt="flag" />
                    <p className="question-p"> {t("question_flag")}</p>
                </div>
            )
        case 2:
            return <p className="question-p"> {t("question_territory", {country: name})}</p>;
        case 3:
            return <p className="question-p"> {t("question_population", {country: name})}</p>;
        default:
            return <p className="question-p"> {t("question_continent", {country: name})}</p>;
    }
}

export {numberRandom}
export default Question;