import React from 'react';
import useFetch from './component/useFecth';
import logo from './logo.svg';
import './App.css';

function App(){
  //const data = useFetch('https://restcountries.com/v2/all');
  //console.log(data)
  
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro" 
          onClick={()=>{
            console.log(numbers())
          }}
        >
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
}
function numberRandom(){
  return Math.floor(Math.random()*4);
}
function numbers(){
  return Array(4).fill().map((a, i) => a = i).sort(() => Math.random() - 0.5)
}
/*
function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

*/


export default App;
