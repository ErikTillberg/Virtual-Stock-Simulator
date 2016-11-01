import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Worldwide extends TrackerReact(React.Component){


  render(){
    return (
      <div className = "worldwide">
        <h2>Worldwide</h2>
      </div>
    )
  }

}
