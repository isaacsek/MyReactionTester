import React, { Component } from 'react';
import axios from "axios";
import Play from "./play";
import MainMenu from "./mainMenu";
import Leaderboard from "./leaderboard";
import Instructions from "./instructions";
import Credits from "./credits";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {view:"mainMenu", avgTime:0};
    this.quit = this.quit.bind(this);
  }

  startPlay() {
    this.setState({view:"playing"});
  }

  quit() {
    this.setState({view:"mainMenu"});
  }

  viewLeaderboard() {
    this.setState({view:"leaderboard"});
  }

  getInstructions() {
    this.setState({view:"instructions"})
  }

  getCredits() {
    this.setState({view:"credits"});
  }

  renderView() {
    if(this.state.view === "mainMenu") { // quit, goLeaderboard, startPlay, getInstructions, gameOver
      return <MainMenu quit = {() => this.quit()} goLeaderboard = {() => this.viewLeaderboard()} getCredits = {() => this.getCredits()}
        startPlay = {() => this.startPlay()} getInstructions = {() => this.getInstructions()}></MainMenu>;
    } else if (this.state.view === "playing") {
      return <Play quit = {() => this.quit()} goLeaderboard = {() => this.viewLeaderboard()}
        startPlay = {() => this.startPlay()} getInstructions = {() => this.getInstructions()}></Play>;
    } else if (this.state.view === "leaderboard") {
      return <Leaderboard quit = {() => this.quit()} goLeaderboard = {() => this.viewLeaderboard()}
        startPlay = {() => this.startPlay()} getInstructions = {() => this.getInstructions()}></Leaderboard>;
    } else if (this.state.view === "instructions") {
      return <Instructions quit = {() => this.quit()} goLeaderboard = {() => this.viewLeaderboard()}
        startPlay = {() => this.startPlay()} getInstructions = {() => this.getInstructions()}></Instructions>;
    } else if (this.state.view === "credits") {
      return <Credits quit = {() => this.quit()} goLeaderboard = {() => this.viewLeaderboard()}
        startPlay = {() => this.startPlay()} getInstructions = {() => this.getInstructions()}></Credits>;
    } else {
      return <Results results = {this.state.avgTime} quit = {() => this.quit()} goLeaderboard = {() => this.viewLeaderboard()}
        startPlay = {() => this.startPlay()} getInstructions = {() => this.getInstructions()}></Results>;
    }
  }

  render() {
    return (
      <center>
        <div className = "mt-4">
          <div>Reaction Speed Test</div>
          <div>by Isaac Sek</div><br></br>
          <div className = "mt-2">
            {this.renderView()}
          </div>
        </div>
      </center>
    );
  }
}

export default App;
