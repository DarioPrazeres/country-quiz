import React from "react";
import { useContext } from "react";
import { ContContext } from "../App";

function Question() {
    const {textQuestion, setTextQuestion, questionPosition, cont, data} = useContext(ContContext);
    console.log('DATA:', data)
    return (
        <div>
            <p className="question-p">{asking(cont, data, questionPosition)}</p>
        </div>
    )
}
function numberRandom(){
  return Math.floor(Math.random()*5);
}

function asking(value, countries, pos) {
    var capital;
    var name;
    countries && countries[0].map((e, i) => {        
        if (i === pos) {
            console.log('AQUI estou')
            console.log(e);
            capital = e.capital;
            name = e.name;
        }
    })
    switch (value) {
        case 0:
            return `${capital} is the capital of ...`;
            break;
        case 1:
            return '{flag.url} Which countryoes this flag belong to?';
            break;
        case 2:
            return `What is ${name} s territorial extension?`;
            break;
        case 3:
            return `What is the population of ${name}`;
            break;
        default:
            return `What continent ${name} belongs to?`;
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