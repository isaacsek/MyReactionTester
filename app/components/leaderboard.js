import React, { Component } from 'react';
import axios from "axios";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {users: ["test"]};
    this.getLeaderboard();
  }

  getLeaderboard() {
    var self = this;
    axios.get("/leaderboard").then(function(response) {
      self.setState({users:response.data.users});
    });
  }

  renderLeaderboard() {
    if(this.state.users.length > 0) {
      var users = this.state.users;
      var display = [];
      for(var i = 0; i < users.length; i++) {
        display.push(<div key = {i}>{i + 1}. {users[i].name} : {users[i].score} seconds</div>);
      }
      return display;
    }
  }

  render() {
    return (
      <div className = "card" style = {{height:'450px', width:"450px"}}>
        <div className = "card-header"><h4 style = {{color:'gold'}}>Leaderboard</h4></div>
        <div className = "card-block" style = {{maxHeight:'autp', overflow:'auto'}}>
          <div className = "text-left">
            {this.renderLeaderboard()}
          </div>
        </div>
        <div className = "card-footer">
          <div className = "btn btn-danger" onClick = {this.props.quit.bind(this)}>Back</div>
        </div>
      </div>
    );
  }
}

export default Leaderboard;
