import React from "react";
import { useContext } from "react";
import { ContContext } from "../App";
import { asking, numberRandom } from "./Question";
function OptionAnswer() {
    const { option, setOption, setTextQuestion } = useContext(ContContext);
    function controlOption(num){
        setOption(c => c = numbers());
        showValue(option[num]);
        setTextQuestion((t)=> t=asking(numberRandom()));
    }
    console.log(option)
    return (
        <div className="option">
            <button onClick={() => {
                controlOption(0)
            }}>A <p>{option[0]}</p></button>
            <button onClick={() => {
                controlOption(1);
            }}>B <p>{option[1]}</p></button>
            <button
                onClick={() => {
                    controlOption(2);
                }}>C <p>{option[2]}</p></button>
            <button
                onClick={() => {
                    controlOption(3);
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