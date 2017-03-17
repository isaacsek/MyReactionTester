import React, { Component } from 'react';
import axios from "axios";

class Credits extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = "card" style = {{height:'450px', width:"450px"}}>
        <div className = "card-header"><h4 style = {{color:'gold'}}>Credits</h4></div>
        <div className = "card-block">
          <div>Created by Isaac Sek</div>
          <div>Version 1.0</div>
          <div className = "mt-4"><a href = "https://github.com/isek27/MyReactionTester">Github</a></div>
        </div>
        <div className = "card-footer">
          <div className = "btn btn-danger" onClick = {this.props.quit.bind(this)}>Back</div>
        </div>
      </div>
    );
  }
}

export default Credits;
