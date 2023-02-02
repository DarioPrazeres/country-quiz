import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ContContext } from "../App";
import { asking, numberRandom } from "./Question";
function OptionAnswer() {
    const { option, setOption, setTextQuestion, data, setCont, questionPosition, setQuestionPosition } = useContext(ContContext);
    const [text3, setText3] = useState(showOption(data, option[3], questionPosition))
    console.log(text3)
    console.log(data)
    useEffect(()=>{
        
    }, [questionPosition])
    function controlOption(num){
        setOption(c => c = numbers());
        setCont((t)=> t=numberRandom());
    }
    function optionText(){
        var c
        if(questionPosition+4>=data[0].length){
            /*console.log('Position', questionPosition)
            console.log(data[0].length) */           
            data && data[0].map((e, i) => {
                if (i === questionPosition) {
                    console.log(i);
                }
            })
        }else{
            /*console.log('ENtrei aqui')
            console.log('Position', questionPosition)
            console.log(data[0].length)*/
            data && data[0].map((e, i) => {
                if (i === questionPosition) {
                    console.log(i)
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
            >D <p> {text3}</p></button>
        </div>
    )
}
function showOption(array, pos, currentPosition){
    console.log('entrei')
    if(currentPosition+4>=array[0].length){
        console.log('Position', currentPosition)
        console.log(array[0].length)            
        array && array[0].map((e, i) => {
            if (i === (currentPosition-pos)) {
                console.log(e);
                return `Entrei maior`;
            }
        })
    }else{
        console.log('ENtrei aqui')
        console.log('Position', currentPosition)
        console.log(array[0].length)
        array && array[0].map((e, i) => {
            if (i === (currentPosition+pos)) {
                console.log(e)
                return `Entrei menor`;
            }
        })
    }
}
function numbers() {
    return Array(4).fill().map((a, i) => a = i).sort(() => Math.random() - 0.5)
}
function numbersRandom(){
    return Math.floor(Math.random()*250);
}
export { numbers, numbersRandom };
export default OptionAnswer;