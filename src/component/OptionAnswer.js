import React, { useEffect } from "react";
import { useContext } from "react";
import { ContContext } from "../App";
import { numberRandom } from "./Question";
function OptionAnswer() {
    const { option, setOption,point, setPoint, data, setCont, cont, questionPosition, setQuestionPosition, played, setPlayed} = useContext(ContContext);
    
    useEffect(() => {
        console.log("POSITION", questionPosition)
    }, [questionPosition, point])
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
    function updateButton(value, id) {
        setPlayed((c)=> c+1);
        console.log("JOGADA", played);
        console.log("MODE", cont)
        console.log("POINT",point);
        if(played ===5){
            alert("JOGADAS ESGOTADAS");
            setPoint((c)=>c=0);
            setPlayed((c)=>c=0);
        }        
        document.getElementById('nextQuestion').style.height = '550px';
        document.getElementById('next').style.display = 'block'
        switch (corectAnswer(showOption(data, option[value], questionPosition), questionPosition)) {
            case true:
                document.getElementById(`${id}`).classList.add("correct");
                document.getElementById(`${id}`).classList.remove("neutro");
                console.log("ACERTEI ANTES",point);
                setPoint((c)=> c + 1);
                console.log("ACERTEI DEPOIS",point);
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
            document.getElementById('nextQuestion').style.height = '500px';
        })
        
    }
    function showCorrect() {
        for (var i = 0; i < 4; i++) {
            data && data.map((e, index) => {
                if (index === questionPosition) {
                    const optionCorrect = document.getElementById(`option-${i}`);
                    if (e.name === optionCorrect.outerText) {
                        optionCorrect.classList.remove("neutro");
                        optionCorrect.classList.add("correct");
                    }else if(cont===4){
                        if (e.continent||e.region === optionCorrect.outerText) {
                            optionCorrect.classList.remove("neutro");
                            optionCorrect.classList.add("correct");
                        }
                    }else if(cont===2){
                        if (e.area === Number(optionCorrect.outerText)) {
                            optionCorrect.classList.remove("neutro");
                            optionCorrect.classList.add("correct");
                        }
                    }else if(cont===3){
                        if (e.population === Number(optionCorrect.outerText)) {
                            optionCorrect.classList.remove("neutro");
                            optionCorrect.classList.add("correct");
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
                    updateButton(3, 'option-3');
                }}
            ><p id="p-3">{optionText(showOption(data, option[3], questionPosition))}</p></button>
            <button id="next" className="nextQuestion">Next</button>
        </div>
    )
}
function showOption(array, pos, currentPosition) {
    if (currentPosition + 4 >= 250) {
        return currentPosition - pos;
    } else {
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
    if (position === corectPosition) {
        return true;
    } else {
        return false;
    }
}
export { numbers, numbersRandom };
export default OptionAnswer; 