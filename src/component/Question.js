import React from "react";
import { useContext } from "react";
import { ContContext } from "../App";

function Question() {
    const {questionPosition, cont, data} = useContext(ContContext);
    
    return (
        <div>
            <Asking countries={data} value={cont} pos={questionPosition} />
        </div>
    )
}
function numberRandom(){
  return Math.floor(Math.random()*5);
}

function Asking(props) {
    var capital, name, url,continent;
    var pos = props.pos;
    var countries = props.countries;
    var value = props.value;
    //const valoresUnicos = gerarValoresUnicos(100);
    countries && countries.map((e, i) => {        
        if (i === pos) {
            capital = e.capital;
            name = e.name.common;
            url = e.flags.png;
            continent = e.continents[0]
        }
    })
    if(capital=== undefined){
        value ++;
    }
    
    switch (value) {
        case 0:
            return <p className="question-p"> {capital} is the capital of ... </p>;
        case 1:
            return (
                <div className="dp">
                    <img className="imgFlag" src={url} alt="flag" />
                    <p className="question-p"> Which countries this flag belong to?</p>
                </div>
            )
        case 2:
            return <p className="question-p"> What is {name}'s territorial extension?</p>;
        case 3:
            return <p className="question-p"> What is the population of {name}</p>;
        default:
            return <p className="question-p"> What continent {name} belongs to?</p>;
    }
}
/*function gerarValoresUnicos(quantidade) {
    const valores = [];
    while (valores.length < quantidade) {
        const valor = Math.floor(Math.random() * 100) + 1;
        if (!valores.includes(valor)) {
            valores.push(valor);
        }
    }
    return valores;
}*/





export {numberRandom}
export default Question;