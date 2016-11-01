import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Purchase extends TrackerReact(React.Component){

  render(){
    return (
      <div>
        <button className = "btn" onClick = {this.openModal}>Purchase Stock {this.props.stockSymbol}</button>
      </div>
    )
  }

}
