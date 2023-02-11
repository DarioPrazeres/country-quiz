import React from "react";
import { useContext } from "react";
import { ContContext } from "../App";

function Question() {
    const {textQuestion, setTextQuestion, questionPosition, cont, data} = useContext(ContContext);
    //console.log('DATA:', data)
    
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
    var capital, name, url;
    var pos = props.pos;
    var countries = props.countries;
    var value = props.value;
    countries && countries.map((e, i) => {        
        if (i === pos) {
            //console.log('O corrento', props.pos)
            //console.log(e);
            capital = e.capital;
            name = e.name;
            url = e.flags.png;
        }
    })
    if(capital=== undefined){
        value ++;
    }
    switch (value) {
        case 0:
            return <p className="question-p"> {capital} is the capital of ... ${pos}</p>;
            break;
        case 1:
            return (
                <div className="dp">
                    <img className="imgFlag" src={url} alt="flag" />
                    <p className="question-p"> Which countries this flag belong to? {pos}</p>
                </div>
            )
            break;
        case 2:
            return <p className="question-p"> What is {name}'s territorial extension? ${pos}</p>;
            break;
        case 3:
            return <p className="question-p"> What is the population of ${name}  ${pos}</p>;
            break;
        default:
            return <p className="question-p"> What continent {name} belongs to?  ${pos} </p>;
            break;
    }
}
export {numberRandom}
export default Question;