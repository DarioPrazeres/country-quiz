import React from "react";
import { useContext } from "react";
import { ContContext } from "../App";
import { asking, numberRandom } from "./Question";
function OptionAnswer() {
    const { option, setOption, setTextQuestion } = useContext(ContContext);

    console.log(option)
    return (
        <div className="option">
            <button onClick={() => {
                setOption(c => c = numbers());
                showValue(option[0]);
                setTextQuestion((t)=> t=asking(numberRandom()));
            }}>A <p>{option[0]}</p></button>
            <button onClick={() => {
                setOption(c => c = numbers());
                showValue(option[1]);
                setTextQuestion((t)=> t=asking(numberRandom()));
            }}>B <p>{option[1]}</p></button>
            <button
                onClick={() => {
                    setOption(c => c = numbers());
                    showValue(option[2]);
                    setTextQuestion((t)=> t=asking(numberRandom()));
                }}>C <p>{option[2]}</p></button>
            <button
                onClick={() => {
                    setOption(c => c = numbers());
                    showValue(option[3]);
                    setTextQuestion((t)=> t=asking(numberRandom()));
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
export { numbers };
export default OptionAnswer;