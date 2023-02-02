import React from "react";
import { useContext } from "react";
import { ContContext } from "../App";

function Question() {
    const {textQuestion, setTextQuestion, questionPosition, cont, data} = useContext(ContContext);
    //console.log('DATA:', data)
    
    return (
        <div>
            (
                if
            )
            <Display cont={cont}/>
            <p className="question-p">{asking(cont, data, questionPosition)}</p>
        </div>
    )
}
function Display(props){
    return (
        <img className="imgFlag" src="" alt="flag" />
    )
}
function numberRandom(){
  return Math.floor(Math.random()*5);
}

function asking(value, countries, pos) {
    var capital, name, url;
    const img = document.querySelector('img.imgFlag')
    countries && countries[0].map((e, i) => {        
        if (i === pos) {
            console.log('O corrento', pos)
            console.log(e);
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
            return `${capital} is the capital of ... ${pos}`;
            break;
        case 1:
            return `Which countryoes this flag belong to? ${pos}`;
            break;
        case 2:
            return `What is ${name} s territorial extension? ${pos}`;
            break;
        case 3:
            return `What is the population of ${name}  ${pos}`;
            break;
        default:
            return `What continent ${name} belongs to?  ${pos}`;
            break;
    }
}
/*
Idea of questions!
{data.capital} is the capital of ...
{flag.url} Which countryoes this flag belong to?
What is {country.name}'s territorial extension?
What is the population of {country.name}?
What continent {country.name} belongs to?
*/
export {asking, numberRandom}
export default Question;