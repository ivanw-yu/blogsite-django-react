import React, {Component} from 'react';
import {connect} from 'react-redux';

class DashboardOptionsPanel extends Component{

  render(){
    return this.props.link && (
      <div className = "options-panel">
        <button> Edit</button>
        <button> Delete </button>
      </div>
    );
  }

}
