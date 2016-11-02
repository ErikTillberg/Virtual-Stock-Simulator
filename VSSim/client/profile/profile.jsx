import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Profile extends TrackerReact(React.Component){

  constructor(){
    super();
  }

  componentDidMount(){
    document.getElementById("defaultOpen").click();
  }

  openPage(evt, pageName){
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for(i = 0; i < tabcontent.length;i++){
      tabcontent[i].style.display="none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for(i = 0; i < tablinks.length;i++){
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(pageName).style.display = "block";
    evt.currentTarget.className += " active";

  }

  openNav(){
    document.getElementById("closebtnId").style.marginLeft = "210px";
    document.getElementById("stockPickerId").style.width = "250px";
    document.getElementById("profileID").style.marginLeft = "250px";
  }

  closeNav(){
    document.getElementById("closebtnId").style.marginLeft = "-30px";
    document.getElementById("stockPickerId").style.width = "0";
    document.getElementById("profileID").style.marginLeft = "0";
  }

  render(){
    return (

      <div>

        <ul className = "tab">
          <li><a href = "javascript:void(0)" id = "defaultOpen" className = "tablinks" onClick={()=>this.openPage(event, 'profileHome')}>Home</a></li>
          <li><a href = "javascript:void(0)" className = "tablinks" onClick={()=>this.openPage(event, 'profileStocks')}>Stocks</a></li>
          <li><a href = "javascript:void(0)" className = "tablinks" onClick={()=>this.openPage(event, 'profileAnalytics')}>Analytics</a></li>
        </ul>


        <div id = "profileHome" className = "tabcontent">
          <p>Home.</p>
        </div>

        <div id = "stockPickerId" className = "stockPicker">
          <a id = "closebtnId" href = "javascript:void(0)" className = "closebtn" onClick = {this.closeNav}>&times;</a>
          <h2>Your Stocks</h2>
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

        <div id = "profileStocks" className = "tabcontent">
          <div id = "profileID" className = "profile">
            <h1>Profile</h1>
            <button className = "btn" onClick = {this.openNav}><strong>Choose Stock</strong></button>
            <p>
              some content about stuff, i dunno.
            </p>
          </div>


        </div>

        <div id = "profileAnalytics" className = "tabcontent">
          <p>Analytics.</p>
        </div>

      </div>
    )
  }

}
