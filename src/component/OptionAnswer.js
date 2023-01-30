import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ContContext } from "../App";
import { asking, numberRandom } from "./Question";
function OptionAnswer() {
    const { option, setOption, setTextQuestion, data } = useContext(ContContext);
    const [questionPosition, setQuestionPosition] = useState(numbersRandom())
    console.log(data)
    useEffect(()=>{
        
    }, [questionPosition])
    function controlOption(num){
        setOption(c => c = numbers());
        //showValue(option[num]);
        setTextQuestion((t)=> t=asking(numberRandom()));
    }
    function optionText(){
        var c
        if(questionPosition+4>=data[0].length){
            console.log('Position', questionPosition)
            console.log(data[0].length)            
            data && data[0].map((e, i) => {
                if (i === questionPosition) {
                    console.log(e)
                }
            })
        }else{
            console.log('ENtrei aqui')
            console.log('Position', questionPosition)
            console.log(data[0].length)
            data && data[0].map((e, i) => {
                if (i === questionPosition) {
                    console.log(e)
                }
            })
        }
    }
    console.log(option)
    return (
        <div className="option">
            <button onClick={() => {
                controlOption(0);
                optionText();
                setQuestionPosition(c=> c = numbersRandom());
            }}>A <p>{option[0]}</p></button>
            <button onClick={() => {
                controlOption(1);
                optionText();
                setQuestionPosition(c=> c = numbersRandom());
            }}>B <p>{option[1]}</p></button>
            <button
                onClick={() => {
                    controlOption(2);
                    optionText();
                }}>C <p>{option[2]}</p></button>
            <button
                onClick={() => {
                    controlOption(3);
                    optionText();
                }}
            >D <p>{option[3]}</p></button>
        </div>
    )
}
function showValue(value) {
    console.log(value);
}
function numbers() {
    return Array(4).fill().map((a, i) => a = i).sort(() => Math.random() - 0.5)
}
function numbersRandom(){
    return Math.floor(Math.random()*250);
}
export { numbers };
export default OptionAnswer;