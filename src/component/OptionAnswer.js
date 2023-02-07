import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ContContext } from "../App";
import { numberRandom } from "./Question";
function OptionAnswer() {
    const optionA = document.querySelector('button.option-0')
    const { option, setOption, setTextQuestion, data, setCont, cont, questionPosition, setQuestionPosition } = useContext(ContContext);
    useEffect(() => {
        console.log("POSITION", questionPosition)
    }, [questionPosition])
    function controlOption(num) {
        setOption(c => c = numbers());
        setCont((t) => t = numberRandom());
    }
    
    function optionText(valuePos) {
        var optionTerritorial, optionCountryName, optionNumberPopulation, optionNameContinent;
        data && data[0].map((e, i) => {
            if (i === valuePos) {
                optionTerritorial = e.area;
                optionCountryName = e.name;
                optionNameContinent = e.continent || e.region;
                optionNumberPopulation = e.population
                if(optionTerritorial=== undefined){
                    
                }
            }
        })
        switch (cont) {
            case 0:
                return ` ${optionCountryName}`;
                break;
            case 1:
                return ` ${optionCountryName}`;
                break;
            case 2:
                return ` ${optionTerritorial} Km`;
                break;
            case 3:
                return ` ${optionNumberPopulation} People`;
                break;
            default:
                return ` ${optionNameContinent}`;
                break;
        }
    }
    //console.log(option)
    function updateButton(value, id) {
        document.getElementById('next').style.display = 'block'
        switch (corectAnswer(showOption(data, option[value], questionPosition), questionPosition)) {
            case true:
                document.getElementById(`${id}`).classList.add("correct");
                document.getElementById(`${id}`).classList.remove("neutro");
                break;
        
            case false:
                document.getElementById(`${id}`).classList.add("incorrect");
                document.getElementById(`${id}`).classList.remove("neutro");
                break;
        }
        document.getElementById('next').addEventListener('click', ()=>{
            document.getElementById('option-0').classList.remove("incorrect");
            document.getElementById('option-1').classList.remove("incorrect");
            document.getElementById('option-2').classList.remove("incorrect");
            document.getElementById('option-3').classList.remove("incorrect");
            document.getElementById('option-0').classList.remove("correct");
            document.getElementById('option-1').classList.remove("correct");
            document.getElementById('option-2').classList.remove("correct");
            document.getElementById('option-3').classList.remove("correct");
            controlOption(value);
            setQuestionPosition(c => c = numbersRandom()); 
        })
        
    }
    return (
        <div className="option">
            <button id="option-0" className="option-0 neutro" onClick={() => {        
                updateButton(0, 'option-0')
            }}>A {showOption(data, option[0], questionPosition)} <p> {optionText(showOption(data, option[0], questionPosition))}</p></button>
            <button id='option-1' className="option-1 neutro" onClick={() => {
                updateButton(1, 'option-1')
            }}>B {showOption(data, option[1], questionPosition)} <p> {optionText(showOption(data, option[1], questionPosition))}</p></button>
            <button id='option-2' className="option-2 neutro"
                onClick={() => { 
                  updateButton(2, 'option-2')                    
                }}>C {showOption(data, option[2], questionPosition)} <p> {optionText(showOption(data, option[2], questionPosition))}</p></button>
            <button id='option-3' className="option-3 neutro"
                onClick={() => {
                    updateButton(3, 'option-3')                    
                }}
            >D {showOption(data, option[3], questionPosition)} <p> {optionText(showOption(data, option[3], questionPosition))}</p></button>
            <button id="next" className="nextQuestion">Next</button>
        </div>
    )
}
function showOption(array, pos, currentPosition) {
    if (currentPosition + 4 >= array[0].length) {
        console.log('Position Maior', currentPosition)
        return currentPosition - pos;
    } else {
        console.log('Position Menor', currentPosition)
        return currentPosition + pos;
    }
}
function numbers() {
    return Array(4).fill().map((a, i) => a = i).sort(() => Math.random() - 0.5)
}
function numbersRandom() {
    return Math.floor(Math.random() * 250);
}
function corectAnswer(position, corectPosition){
    console.log("CORRECT POSITION", corectPosition)
    console.log("Other POSITION", position)
    if(position == corectPosition){
        //alert('WINNER')
        console.log('WINNER!!');
        return true;
    }else{
        //alert('LOSER')
        console.log('LOSER!!')
        return false;
    }
}
export { numbers, numbersRandom };
export default OptionAnswer;