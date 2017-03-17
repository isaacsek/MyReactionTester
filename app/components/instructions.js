import React, { Component } from 'react';
import axios from "axios";

class Instructions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = "card" style = {{height:'450px', width:"450px"}}>
        <div className = "card-header"><h4 style = {{color:'gold'}}>Instructions</h4></div>
        <div className = "card-block text-left" >
          <div>1. Click the box to begin trial.</div>
          <div>2. When box changes color, click again as fast as you can</div>
          <div>3. Repeat two more times for an average.</div>
          <div>4. Type name and hit submit to save score to leaderboard.</div>
        </div>
        <div className = "card-footer">
          <div className = "btn btn-danger" onClick = {this.props.quit.bind(this)}>Back</div>
        </div>
      </div>
    );
  }
}

export default Instructions;
