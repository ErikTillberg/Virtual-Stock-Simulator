import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class About extends TrackerReact(React.Component){

  render(){
    return (
      <div className = "about">
        <h1>About</h1>
        <img style = {{width: 100 + '%', height: 'auto'}}src = {"../../images/chart1.png"}/>
        <p>
          Virtual Stock Simulator is a project created by Erik Tillberg
          and Slim Babay for a Cloud Computing class at Lakehead University.
          On top of it's built-in functionality, it is a project to demonstrate
          the power of using PaaS to host a website.
        </p>

      </div>
    )
  }

}
