import React from "react";
import { useContext } from "react";
import { ContContext } from "../App";
import cupIcon from "../img/cup.svg"
function Result(props) {
    
    const { setPoint, t } = useContext(ContContext)
    return (
        <div id='result' className='result'>
            <img src={cupIcon} />
            <h1>{t("results")}</h1>
            <p>{t("you_got")} <span>{props.point}</span> {t("correct")}</p>
            <button id='tryAgain' onClick={() => {
                localStorage.clear();
                document.getElementById('nextQuestion').style.display = "block";
                document.getElementById('iconWorld').style.display = "block";
                document.getElementById('result').style.display = "none";
                setPoint(0);
            }}>{t("try_again")}</button>
        </div>
    )
}

export default Result;