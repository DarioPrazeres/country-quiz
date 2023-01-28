import React from "react";
import { useContext } from "react";
import { ContContext } from "../App";

function Question() {
    const {textQuestion, setTextQuestion} = useContext(ContContext)
    return (
        <div>
            <p className="question-p">{textQuestion}</p>
        </div>
    )
}
function numberRandom(){
  return Math.floor(Math.random()*5);
}

function asking(value) {
    switch (value) {
        case 0:
            return '{data.capital} is the capital of ...';
            break;
        case 1:
            return '{flag.url} Which countryoes this flag belong to?';
            break;
        case 2:
            return 'What is {country.name}s territorial extension?';
            break;
        case 3:
            return 'What is the population of {country.name}';
            break;
        default:
            return 'What continent {country.name} belongs to?';
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