import React from "react";
import { useContext } from "react";
import { ContContext } from "../App";
import cupIcon from "../img/cup.svg"
function Result(props) {
    const { setPoint } = useContext(ContContext)
    return (
        <div id='result' className='result'>
            <img src={cupIcon} />
            <h1>Results</h1>
            <p>You got <span>{props.point}</span> correct answers</p>
            <button id='tryAgain' onClick={() => {
                localStorage.clear();
                document.getElementById('nextQuestion').style.display = "block";
                document.getElementById('iconWorld').style.display = "none";
                document.getElementById('result').style.display = "none";
                setPoint(0);
            }}>Try again</button>
        </div>
    )
}

export default Result;