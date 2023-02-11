import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ContContext } from "../App";
import { numberRandom } from "./Question";
function OptionAnswer() {
    const optionA = document.querySelector('button.option-0')
    const { option, setOption, setTextQuestion, data, setCont, cont, questionPosition, setQuestionPosition, optionVerify, setOptionVerify } = useContext(ContContext);
    
    useEffect(() => {
        console.log("POSITION", questionPosition)
    }, [questionPosition])
    function controlOption(num) {
        setOption(c => c = numbers());
        setCont((t) => t = numberRandom());
    }

    function optionText(valuePos) {
        var optionTerritorial, optionCountryName, optionNumberPopulation, optionNameContinent;
        data && data.map((e, i) => {
            if (i === valuePos) {
                optionTerritorial = e.area;
                optionCountryName = e.name;
                optionNameContinent = e.continent || e.region;
                optionNumberPopulation = e.population
                if (optionTerritorial === undefined) {

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
                return ` ${optionTerritorial||10000}`;
                break;
            case 3:
                return ` ${optionNumberPopulation}`;
                break;
            default:
                return ` ${optionNameContinent}`;
                break;
        }
    }
    //console.log(option)
    function updateButton(value, id) {
        console.log("MODE", cont)
        document.getElementById('next').style.display = 'block'
        switch (corectAnswer(showOption(data, option[value], questionPosition), questionPosition)) {
            case true:
                document.getElementById(`${id}`).classList.add("correct");
                document.getElementById(`${id}`).classList.remove("neutro");
                break;

            case false:
                document.getElementById(`${id}`).classList.add("incorrect");
                document.getElementById(`${id}`).classList.remove("neutro");
                showCorrect();
                break;
        }
        document.getElementById('next').addEventListener('click', () => {
            for (var i = 0; i < 4; i++) {
                document.getElementById(`option-${i}`).classList.remove("incorrect");
                document.getElementById(`option-${i}`).classList.remove("correct");
                document.getElementById(`option-${i}`).classList.add("neutro");
            }
            controlOption(value);
            setQuestionPosition(c => c = numbersRandom());
            document.getElementById('next').style.display = 'none';
        })
        
    }
    function showCorrect() {
        for (var i = 0; i < 4; i++) {
            console.log(i)
            data && data.map((e, index) => {
                if (index === questionPosition) {
                    const optionCorrect = document.getElementById(`option-${i}`);
                    console.log(e.name)
                    console.log(optionCorrect.outerText)
                    if (e.name === optionCorrect.outerText) {
                        optionCorrect.classList.remove("neutro");
                        optionCorrect.classList.add("correct");
                        console.log("AQUI!! ENTREIIIIIIIIIIIIIIIII!")
                    }else if(cont===4){
                        console.log("AQUI!! ENTREIIIIIIIIIIIIIIIII!")
                        if (e.continent||e.region === optionCorrect.outerText) {
                            optionCorrect.classList.remove("neutro");
                            optionCorrect.classList.add("correct");
                            console.log("AQUI!! ENTREIIIIIIIIIIIIIIIII!")
                        }
                    }else if(cont===2){
                        console.log("AQUI!! AREA", e.area)
                        console.log("AQUI!! AREA", optionCorrect.outerText)
                        if (e.area === Number(optionCorrect.outerText)) {
                            optionCorrect.classList.remove("neutro");
                            optionCorrect.classList.add("correct");
                            console.log("AQUI!! ENTREIIIIIIIIIIIIIIIII!")
                        }
                    }else if(cont===3){
                        console.log("AQUI!! Population", e.population)
                        console.log("AQUI!! Population", optionCorrect.outerText)
                        if (e.population === Number(optionCorrect.outerText)) {
                            optionCorrect.classList.remove("neutro");
                            optionCorrect.classList.add("correct");
                            console.log("AQUI!! ENTREIIIIIIIIIIIIIIIII!")
                        }
                    }
                }
            })
        }
    }
    return (
        <div className="option">
            <button id="option-0" className="option-0 neutro" onClick={() => {
                updateButton(0, 'option-0')
            }}><p id="p-0">{optionText(showOption(data, option[0], questionPosition))}</p></button>
            <button id='option-1' className="option-1 neutro" onClick={() => {
                updateButton(1, 'option-1')
            }}><p id="p-1">{optionText(showOption(data, option[1], questionPosition))}</p></button>
            <button id='option-2' className="option-2 neutro"
                onClick={() => {
                    updateButton(2, 'option-2')
                }}><p id="p-2">{optionText(showOption(data, option[2], questionPosition))}</p></button>
            <button id='option-3' className="option-3 neutro"
                onClick={() => {
                    console.log('CACTH',showOption(data, option[3], questionPosition));
                    updateButton(3, 'option-3');
                }}
            ><p id="p-3">{optionText(showOption(data, option[3], questionPosition))}</p></button>
            <button id="next" className="nextQuestion">Next</button>
        </div>
    )
}
function showOption(array, pos, currentPosition) {
    if (currentPosition + 4 >= 250) {
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
function corectAnswer(position, corectPosition) {
    console.log("CORRECT POSITION", corectPosition)
    console.log("Other POSITION", position)
    if (position == corectPosition) {
        //alert('WINNER')
        console.log('WINNER!!');
        return true;
    } else {
        //alert('LOSER')
        console.log('LOSER!!')
        return false;
    }
}
export { numbers, numbersRandom };
export default OptionAnswer; 