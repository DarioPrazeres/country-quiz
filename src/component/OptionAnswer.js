import React, { useEffect } from "react";
import { useContext } from "react";
import { ContContext } from "../App";
import { numberRandom } from "./Question";
function OptionAnswer() {
    const { option, setOption,point, setPoint, data, setCont, cont, questionPosition, setQuestionPosition, played, setPlayed} = useContext(ContContext);
    
    useEffect(() => {
        //console.log("POINT", point)
        //console.log("PLAYED", played)
    }, [questionPosition, point, played])
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
            case 4:
                return ` ${optionNameContinent}`;
                break;
        }
    }
    function updateButton(value, id) {    
        document.getElementById('nextQuestion').style.height = '550px';
        document.getElementById('next').style.display = 'block'
        switch (corectAnswer(showOption(data, option[value], questionPosition), questionPosition)) {
            case true:
                document.getElementById(`${id}`).classList.add("correct");
                document.getElementById(`${id}`).classList.remove("neutro");
                setPoint((c)=> c = point + 1);
                console.log("Point", point)
                break;

            case false:
                document.getElementById(`${id}`).classList.add("incorrect");
                document.getElementById(`${id}`).classList.remove("neutro");
                showCorrect();
                break;
        }
        document.getElementById('next').addEventListener('click', () => {
            setPlayed((c)=> c = played+1);
            if(played === 5){
                document.getElementById('result').style.display = "flex";
                document.getElementById('nextQuestion').style.display = "none";
                document.getElementById('iconWorld').style.display = "none";
            }    
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
        document.getElementById('tryAgain').addEventListener('click', () => {
            if(played === 5){
                console.log(played)
                console.log(point)
                console.log('RESET');

                setPoint((c)=> c = 0)
                setPlayed((c)=> c = 0)
                console.log(point)
                console.log(played)
            }
            document.getElementById('nextQuestion').style.display = "block";
            document.getElementById('iconWorld').style.display = "none";
            document.getElementById('result').style.display = "none";
        });
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