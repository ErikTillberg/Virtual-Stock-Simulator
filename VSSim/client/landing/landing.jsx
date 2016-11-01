import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import AccountsUI from '../AccountsUI.jsx';


export default class Landing extends TrackerReact(React.Component){

  constructor(){
    super();
    Meteor.call('changeStockQuantity', ['go4aH5YWbe2kQBRZv',' goog', 10])
  }

  render(){
    return (
      <div className = "landing">
        <div className = "container-fluid">

          <div className = "row landingHeader">
            <h1>Virtual Stock Simulator</h1>
            <AccountsUI/>
          </div>

          <div className = "row row1">
            <div className = "col-xs-6 colText">
              <h3>Learn about the stock market</h3>
            </div>
            <div className = "col-xs-6">
              <img style = {{width: 100 + '%', height: 'auto'}} src={'../../images/chart1.png'}/>
            </div>
          </div>

          <div className = "row row2">
            <div className = "col-xs-6 colText">
              <h2>Learn market analytics</h2>
            </div>
            <div className = "col-xs-6 ">
              <img style = {{width: 100 + '%', height: 'auto'}} src={'../../images/chart2.png'}/>
            </div>
          </div>

          <div className = "row row3">
            <div className = "col-xs-6 colText">
              <h3>Learn how to grow your income</h3>
            </div>
            <div className = "col-xs-6 ">
              <img style = {{width: 100 + '%', height: 'auto'}} src={'../../images/chart3.png'}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
