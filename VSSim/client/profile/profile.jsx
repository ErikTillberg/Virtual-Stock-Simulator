import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Profile extends TrackerReact(React.Component){

  openNav(){
    document.getElementById("stockPickerId").style.width = "250px";
    document.getElementById("profileID").style.marginLeft = "250px";
  }

  closeNav(){
    document.getElementById("stockPickerId").style.width = "0";
    document.getElementById("profileID").style.marginLeft = "0";
  }

  render(){
    return (
      <div>
        <div id = "profileID" className = "profile">
          <h1>Profile</h1>
          <button onClick = {this.openNav}>Choose Stock</button>
          <p>
            some content about stuff, i dunno.
          </p>
        </div>

        <div id = "stockPickerId" className = "stockPicker">
          <h2>Your Stocks</h2>
          <a href = "javascript:void(0)" className = "closebtn" onClick = {this.closeNav}>&times;</a>
          <ul id = "stockList">
            <li>GOOG</li>
            <li>TSLA</li>
            <li>MSFT</li>
            <li>DOWJ</li>
          </ul>
          <h2>Tracked Stocks</h2>
            <ul id = "stockList">
              <li>GOOG</li>
              <li>TSLA</li>
              <li>MSFT</li>
              <li>DOWJ</li>
              <li>TSLA</li>
              <li>MSFT</li>
              <li>DOWJ</li>
            </ul>
        </div>

      </div>

    )
  }

}
