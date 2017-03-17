import React, { Component } from 'react';
import axios from "axios";
import moment from "moment";

var trialCount = 0;
var trialTimes = [];
var timerStarted = false;
var startTimer, stopTimer;
var timer, avgTime;
var red = "#E74C3C";
var green = "#27AE60";
var white = "#fff";

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {view:"trialNotStarted", backgroundColor: white, saveName:""};
    this.beforeTrial = this.beforeTrial.bind(this);
    this.afterTrial = this.afterTrial.bind(this);
  }

  componentWillMount() {
    trialTimes = [];
    trialCount = 0;
    timerStarted = false;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  componentWillUnmount() {
   clearTimeout(timer);
  }

 beforeTrial() {
   timerStarted = false;
   var self =this;
   this.setState({view: "trialInProgress", backgroundColor: green});
   var randomStart = this.getRandomInt(2, 9); // get random time
   timer = setTimeout(function() { // After random amount of time change color
     timerStarted = true;
     self.setState({backgroundColor: red});
     startTimer = moment().valueOf();
   }, randomStart * 1000);
 }

 afterTrial() {
   this.setState({view: "trialNotStarted", backgroundColor: white});
   var self = this;
   stopTimer = moment().valueOf();
   if(timerStarted == false) {
     alert("You clicked before the screen changed! Start over.");
     self.props.quit();
   }
   timerStarted = false;

   trialTimes.push(stopTimer - startTimer);
   trialCount++

   if(trialCount >= 3) {
     var temp = trialTimes[0] + trialTimes[1] + trialTimes[2];
     avgTime = Math.round(((temp / 1000)/ 3) * 1000) / 1000;
     this.setState({view:"gameOver"});
   }
 }

  handleClick() {
    if(trialCount >= 3) {
      this.setState({view:"gameOver"});
    }
    else if(this.state.view === "trialNotStarted") { // If on pause screen
      this.beforeTrial();
    }
    else if (this.state.view === "trialInProgress") { // Click after timer started
        this.afterTrial();
    }
  }

  renderTrialResults() {
    var renderResults  = [];
    for(var i = 0; i < trialTimes.length; i++) {
      renderResults.push(<div key = {i}>Trial {i +  1}: {trialTimes[i]/1000} seconds</div>);
    }
    return renderResults;
  }

  handleNameChange(e) {
    this.setState({saveName:e.target.value})
  }

  handleScoreSave() {
    console.log("Saving score...");
    var self = this;
    if(this.state.saveName.length == 0) {
      alert("Input name to save!");
    } else {
      axios.post('/newscore', {
        name: this.state.saveName,
        score: avgTime
      })
      .then(function (response) {
        //console.log(response);
        console.log("Score sucessfully saved!");
        self.props.goLeaderboard();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  renderGame() {
    if(this.state.view === "trialNotStarted") {
      return (
        <div>
          {this.renderTrialResults()}
          <div className = "mt-2">Click to start next trial</div>
        </div>
      );
    } else if (this.state.view === "trialInProgress"){
      return (
        <div>
          Click when this changes color!
        </div>
      );
    } else if (this.state.view === "gameOver"){
      return (
        <div>
          {this.renderTrialResults()}
          <div className = "mt-2">
            <strong>Average Time = {avgTime} seconds</strong>
          </div>
          <div className = "mt-4">
            <label className = "mr-2">Save score: </label>
            <input id = "textName" type = "text" placeholder = "name" onChange = {(e) => this.handleNameChange(e)}></input>
            <input type = "submit" onClick = {() => this.handleScoreSave()}></input>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className = "card" style = {{height:'450px', width:"450px"}}>
        <div className = "card-header"><h4 style = {{color:'gold'}}>React</h4></div>
        <div className = "card-block" onClick = {() => {this.handleClick()}} style = {{backgroundColor: this.state.backgroundColor}}>
          {this.renderGame()}
        </div>
        <div className = "card-footer">
          <div className = "btn btn-danger" onClick = {this.props.quit.bind(this)}>Back</div>
        </div>
      </div>
    );
  }
}

export default Play;
