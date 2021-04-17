import { Bar } from 'react-chartjs-2';
import React, { useState } from 'react';
import { backgroundColors, borderColors, graphOptions, buttonStyles, songObject } from './constants';
import './App.css';


function App() {
  // React code that makes re-rendering things easy (like the graph) 
  let [graphData, setGraphData] = useState({});
  let [clicked, setClicked] = useState(false);


  // Gives the backend code a few seconds to make sure everything works as expected
  let processRequests =  () => { 
    setTimeout(() => {getAPIData(); console.log(songObject)}, 5000); 
  }



  let getAPIData = () => {
    // The JSON data that the Spotify API returns
    // Make the JSON into an Array
    let songArr = [];
    for (var item in songObject) {
      songArr.push([item, songObject[item]]);
    }

    // Sorts Songs by Most Listened
    songArr.sort(function(a, b) {
      return b[1] - a[1];
    });

    // Format song Name and song Count into array, make it readable by graphing component
    let labelsArr = [];
    let dataArr = [];

    for (const i in songArr.slice(0, 7)) {
      labelsArr.push(songArr[i][0])
      dataArr.push(songArr[i][1])
    }

    // Data used to make graph by graphing Component
    graphData = {
      labels: labelsArr,
      datasets: [{
        data: dataArr,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
        color: '#000000',
      }],
    }
    setGraphData(graphData);
    setClicked(true);
  }

  return (
    <div className="App">
      <header className="App-header">
      <div style={{width: '70%'}}>
        <button style={buttonStyles} onClick={processRequests}>Make Graph</button>
        {clicked? (
          <Bar
            data={graphData}
            width={250}
            height={150}
            options={graphOptions}
          />
        ) : null
        }

      </div>
      </header>

    </div>
  );
}

export default App;
