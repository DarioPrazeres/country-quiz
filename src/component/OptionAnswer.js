import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ContContext } from "../App";
import { numberRandom } from "./Question";
function OptionAnswer() {
    const { option, setOption, setTextQuestion, data, setCont, cont, questionPosition, setQuestionPosition } = useContext(ContContext);
    useEffect(() => {

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
    console.log(option)
    function updateButton(value) {
        controlOption(value);
        setQuestionPosition(c => c = numbersRandom());
    }
    return (
        <div className="option">
            <button onClick={() => {
                updateButton(0)
                corectAnswer(option[0], questionPosition)
            }}>A {showOption(data, option[0], questionPosition)} <p> {optionText(showOption(data, option[0], questionPosition))}</p></button>
            <button onClick={() => {
                updateButton(1)
                corectAnswer(option[1], questionPosition)
            }}>B {showOption(data, option[1], questionPosition)} <p> {optionText(showOption(data, option[1], questionPosition))}</p></button>
            <button
                onClick={() => {
                    updateButton(2)
                    corectAnswer(option[2], questionPosition)
                }}>C {showOption(data, option[2], questionPosition)} <p> {optionText(showOption(data, option[2], questionPosition))}</p></button>
            <button
                onClick={() => {
                    updateButton(3)
                    corectAnswer(option[3], questionPosition)
                }}
            >D {showOption(data, option[3], questionPosition)} <p> {optionText(showOption(data, option[3], questionPosition))}</p></button>
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
    if(position === corectPosition){
        console.log('WINNER!!')
    }
}
export { numbers, numbersRandom };
export default OptionAnswer;