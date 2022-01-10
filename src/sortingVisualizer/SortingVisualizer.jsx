import React, { Component } from "react";
import "./sortingVisualizer.css";
import * as sortingAlgorithms from "../sortingAlgorithms/sortingAlgorithms";
import Logo from "./logo.png";
import Controls from "../controller/controller";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      elementColor: ["#66FF66"],
      hardReset: false,
      size: 75,
      speed: 5,
    };
  }

  componentDidMount() {
    this.createArray(75);
  }

  sizechange = (t) => {
    this.setState({ size: t });
    this.createArray(t);
  };

  speedChange = (t) => {
    this.setState({ speed: t });
  };

  colorChange = (t) => {
    this.setState({ elementColor: t });
  };

  reset = () => {
    window.location.reload(false);
  };

  randomArray = () => {
    this.createArray(this.state.size);
  }

  createArray = (size) => {
    const newArray = [];

    for (let i = 0; i <= size; i++) {
      if (i === 45) {
        continue;
      }
      newArray.push(Math.floor(Math.random() * 400));
    }
    newArray[45] = 400;
    newArray[5] = 400;
    this.setState({ array: newArray });
  };

  mergeSortMain() {
    const anime = sortingAlgorithms.mergeSort(this.state.array);
    const bars = document.getElementsByClassName("array-bar");

    // console.log(sortedArrayChecker(anime, this.state.array));

    for (let i = 0; i < anime.length; i++) {
      let colorChange = i % 3 !== 2;

      if (colorChange) {
        const color = i % 3 === 0 ? "red" : this.state.elementColor;

        const [index1, index2] = anime[i];
        const bar1 = bars[index1];
        const bar2 = bars[index2];

        setTimeout(() => {
          bar1.style.backgroundColor = color;
          bar2.style.backgroundColor = color;
        }, i * (100 / this.state.speed));
      } else {
        setTimeout(() => {
          const [index, newHeight] = anime[i];
          const bar = bars[index].style;
          bar.height = `${newHeight}px`;
        }, i * (100 / this.state.speed));
      }
    }
  }

  quickSortMain = (array) => {
    const anime = sortingAlgorithms.qsort(array)

    let count = 0;
    for(let i=0; i<anime.length; i++){

      let bars = document.getElementsByClassName('array-bar');
      let color = count%2 === 0 ? 'red' : this.state.elementColor;
      let [a, b] = anime[i]
      let bar1 = bars[a].style;
      let bar2 = bars[b].style;

      if(anime[i].length === 2){
        count++;
        setTimeout(() => {
          bar1.backgroundColor = color;
          bar2.backgroundColor = color;
        }, i*(100/this.state.speed))
      }
      else if(anime[i].length === 4){
        setTimeout(() => {
          bar1.height = `${anime[i][3]}px`
          bar2.height = `${anime[i][2]}px`
        }, i*(100/this.state.speed));
      }
    }
  }
  
  heapMain = (array) => {
    const anime = sortingAlgorithms.heapsort(array)
    console.log(anime)
    let count = 0;
    for(let i=0; i<anime.length; i++){
      let bars = document.getElementsByClassName('array-bar');
        let color = count%2 === 0 ? 'red' : this.state.elementColor;
        let [a, b] = anime[i]
        let bar1 = bars[a].style;
        let bar2 = bars[b].style;

        if(anime[i].length === 2){
          count++;
          setTimeout(() => {
            bar1.backgroundColor = color;
            bar2.backgroundColor = color;
          }, i*(100/this.state.speed))
        }
        else if(anime[i].length === 4){
          setTimeout(() => {
            bar1.height = `${anime[i][3]}px`
            bar2.height = `${anime[i][2]}px`
          }, i*(100/this.state.speed));
        }
    }
  }

  render() {
    return (
      <div>
        {/* ------ Heading of page------ */}
        <div className="nav">
          <img className="logo" src={Logo} alt="logo" />
          <label className="mainHeading">Sorting Visualizer</label>
        </div>

        {/* ------ CONTROLS & SORTING BUTTONS------ */}

        <div className="buttons">
          {/* ------ Controls------ */}
          <Controls
            sizeChanger={(event) => {
              this.sizechange(event.target.value);
            }}
            colorChanger={(event) => {
              this.colorChange(event.target.value);
            }}
            speedChanger={(event) => {
              this.speedChange(event.target.value);
            }}
          />


          {/* ------ Sorting Buttons------ */}
          <div className="buttonContainer">
            <button className="sortButton" onClick={this.randomArray}>Random Array</button>
            <button
              className="sortButton"
              onClick={() => this.mergeSortMain(this.state.array)}
            >
              Merge Sort
            </button>
            <button
              className="sortButton"
              onClick={() => this.quickSortMain(this.state.array)}
            >
              Quick Sort
            </button>
            <button
              className="sortButton"
              onClick={() => this.heapMain(this.state.array)}
            >
              Heap Sort
            </button>
          </div>
        </div>

        {/* ------ Array Container------ */}
        <div className="array-container">
          {this.state.array.map((value, index) => (
            <div
              className="array-bar"
              key={index}
              style={{
                width: `${1430 / this.state.array.length - 4}px`,
                height: `${value}px`,
                backgroundColor: `${this.state.elementColor}`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function sortedArrayChecker(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;

  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}
