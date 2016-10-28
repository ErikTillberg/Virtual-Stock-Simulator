import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import AccountsUI from '../AccountsUI.jsx';


export default class Landing extends TrackerReact(React.Component){

  constructor(){
    super();
  }

  render(){
    return (
      <div className = "landing">
        <h1>Virtual Stock Simulator</h1>
        <AccountsUI/>
        <div className = "container-fluid">
          <div className = "row row1">
            <div className = "col-xs-6">
              <h3>Learn the ins and outs of the stock market without losing money</h3>
            </div>
            <div className = "col-xs-6">
              <img style = {{width: 100 + '%', height: 'auto'}} src={'../../images/chart1.png'}/>
            </div>
          </div>
          <div className = "row row2">
            <div className = "col-xs-6">
              <h3>Get an introduction to stock analytics using our simple to understand and easy to use tools</h3>
            </div>
            <div className = "col-xs-6 ">
              <img style = {{width: 100 + '%', height: 'auto'}} src={'../../images/chart2.png'}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
