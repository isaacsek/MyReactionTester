import React, { Component } from 'react';
import axios from "axios";

class MainMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className ="btn-group-vertical btn-group-lg mt-4">
        <h4 className = "">Main Menu</h4>
        <div className = "btn btn-secondary mt-2" onClick = {this.props.startPlay.bind(this)}>Play</div>
        <div className = "btn btn-secondary" onClick = {this.props.getInstructions.bind(this)}>Instructions</div>
        <div className = "btn btn-secondary" onClick = {this.props.goLeaderboard.bind(this)}>Leaderboard</div>
        <div className = "btn btn-secondary" onClick = {this.props.getCredits.bind(this)}>Credits</div>
      </div>
    );
  }
}

export default MainMenu;
