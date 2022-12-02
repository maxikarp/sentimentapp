import './App.css';
import React, { useEffect, useState } from 'react';

var sentiments = {
  "-5":"Extremely Negative",
  "-4":"Very Negative",
  "-3":"Negative",
  "-2":"Moderately Negative",
  "-1":"Somewhat Negative",
  "0":"Neutral",
  "1":"Somewhat Positive",
  "2":"Moderately Positive",
  "3":"Positive",
  "4":"Very Positive",
  "5":"Extremely Positive"
};

function AnalyzeSentiment(text) {
  var Sentiment = require('sentiment');
  var sentiment = new Sentiment();
  var verdict = sentiment.analyze(text);
  return verdict;
}

function App() {
  const resultHeader = React.useRef(null);
  const sentimentBox = React.useRef(null);
  const [result, setResult] = useState('Please enter text.')

  const handleClick = (() => {

    var out = AnalyzeSentiment(sentimentBox.current.value);
    console.log(out);
    var outScore = out.score;

    //adjusting scores that are passed the extremes
    if(outScore < -5){
      outScore = -5;
    }

    if(outScore > 5){
      outScore = 5;
    }

    var dispayedSentiment = sentiments[outScore];

    setResult(dispayedSentiment);

  });

  return (
    <div className="App">
      <h1>Sentiment Analysis for the Daily Bugle</h1>
      <textarea ref={sentimentBox} id="sentimentBox"></textarea>
      <br></br>
      <button onClick={handleClick}>Analyze Sentiment</button>
      <h2>Result is:</h2>
      <h3 ref={resultHeader} id="resultHeader">{result}</h3>
    </div>
  );
}

export default App;
