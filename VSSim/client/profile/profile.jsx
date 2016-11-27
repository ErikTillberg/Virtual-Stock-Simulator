import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import Purchase from '../purchase/purchase.jsx';
import Sell from '../sell/sell.jsx';

export default class Profile extends TrackerReact(React.Component){

  constructor(){
    super();
    this.state = {
      user: Meteor.user()
    }
    var self = this;
    //This is such bad code I'm embarassed but I can't figure out how to fix it.
    setTimeout(function(){
      self.setState({user:Meteor.user()});
    }, 1000);
  }

  componentWillMount(){
    this.setState({user: Meteor.user()});
  }

  componentDidMount(){
    document.getElementById("defaultOpen").click();
    this.setState({user: Meteor.user()});
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

  calculateStockValue(){
    //This method calculates the networth of the logged in user
    var owned = this.state.user.stocksOwned;
    var stockVal = 0;

    for (var key in owned){
      stockVal += owned[key].count*owned[key].currentValue;
    }

    return stockVal;

  }

  calculateNetworth(){
    var stockVal = this.calculateStockValue();

    return (stockVal + this.state.user.cashOnHand);

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

  stocks(){
    var owned = this.state.user.stocksOwned;

    var ret = [];

    for (var key in owned){
      ret.push({symbol: key, count: owned[key].count, cost: owned[key].currentValue});
    }
    return ret;
  }

  firstStock(){
    var owned = this.state.user.stocksOwned;

    if (owned == {}){
      return '';
    }

    for (var key in owned){
      return key;
    }
  }

  displayGraph(symbolInput){

    this.setState({stockPicked: symbolInput});

    //Grab the stock symbol from the user input.
    //TODO add error checking (search db of stock symbols for example)
    if (symbolInput === ''){return;}
    var symbol = symbolInput;
    symbol = symbol.toUpperCase();

    interval = 3600*24

    numDays = 80

    //Meteor method call.
    Meteor.call('getStockHistoricalPrice', [symbol, interval, numDays], function(err, data){
      if (err){
        console.error("Error getting stock info");
      } else {
        //The returned data contains a unix time stamp for the first date,
        //and then an integer for each successive time (e.g. a510543535, 1, 2, 3 ...)
        //The following parses the data.
        var dates = [];
        var prices = [];
        initTime = data[0].d;
        initTime = parseInt(initTime.substring(1, initTime.length));
        data[0].d = 0;

        var timeChange = 0;
        var prevNum;
        //had to put a bunch of lines that are tough to read to handle the output
        //in the event of a timechange....
        for (var i = 0; i < data.length; i++){
          current = data[i];

          //handle time change
          if (isNaN(parseInt(current.d)) && typeof data[i+1] !== 'undefined'){
            if(isNaN(parseInt(data[i+1].d)))
              {
                initTime = data[i+1].d;
                initTime = parseInt(initTime.substring(1, initTime.length));
              }
              continue;
            }
            //end handling of timechange
          if (i===0){
            time = 0
          } else {
            time = parseInt(current.d);
            prevNum = time;
          }
          date = new Date((initTime + time*interval)*1000)
          dates.push(date);
          prices.push(current.c)
        }
        var stockData = {
          x: dates,
          y: prices,
          type: 'scatter'
        };

        Plotly.newPlot('stockPrices', [stockData]);

      }
    });

  }

  stockPrice(){
    if (this.state.stockPicked){
      Meteor.call('getCurrentStockPrice', [this.state.stockPicked], function(error, result){
        this.setState({stockPrice: result});
      });
    }
  }

  render(){
    return (
      <div>

        <ul className = "tab">
          <li><a href = "javascript:void(0)" id = "defaultOpen" className = "tablinks" onClick={()=>this.openPage(event, 'profileHome')}>Home</a></li>
          <li><a href = "javascript:void(0)" className = "tablinks" onClick={()=>this.openPage(event, 'profileStocks')}>Stocks</a></li>
          <li><a href = "javascript:void(0)" className = "tablinks" onClick={()=>this.openPage(event, 'profileAnalytics')}>Analytics</a></li>
        </ul>

        <div id = "profileHome" className = "tabcontent container">
          <div className = "row">
            <h2 className = "profileTitle">{this.state.user? this.state.user.emails[0].address : 'Loading'} Profile</h2>
          </div>
          <div className = "row profileInfo">
            <div className = "col-xs-2"><h4>User Information</h4></div>
            <div className = "col-xs-8">
              <h4>Cash: {this.state.user? this.state.user.cashOnHand.toFixed(2) : 'Loading'}</h4>
              <h4>Stock Value: {this.state.user? this.calculateStockValue().toFixed(2) : 'Loading'}</h4>
              <h4>Networth: {this.state.user? this.calculateNetworth().toFixed(2) : 'Loading'}</h4>
            </div>
            <div className = "col-xs-2"></div>
          </div>
          <div className = "row">
            <div className = "col-xs-2"><h4>Stock Information</h4></div>
            <div className = "col-xs-8">
              <table className = "table table-striped">
                <thead><tr><th>Symbol</th><th>Count</th><th>Cost</th></tr></thead>
                <tbody>
                {this.state.user?
                    this.stocks().map((stock) => {
                      return (<tr><td>{stock.symbol}</td><td>{stock.count}</td><td>{stock.cost}</td></tr>)
                    }
                ):<tr><td>Loading</td><td>Loading</td><td>Loading</td></tr>}
                </tbody>
              </table>
            </div>
            <div className = "col-xs-2"></div>
          </div>
        </div>

        <div id = "stockPickerId" className = "stockPicker">
          <a id = "closebtnId" href = "javascript:void(0)" className = "closebtn" onClick = {this.closeNav}>&times;</a>
          <h2>Your Stocks</h2>
          <ul id = "stockList">
            {this.state.user ?
              this.stocks().map((stock) => {
                return (<li onClick = {()=>this.displayGraph(stock.symbol)}>{stock.symbol}</li>)
              }) : 'Loading'
            }
          </ul>
          <h2>Tracked Stocks</h2>
          <ul id = "stockList">
            <li>MSFT</li>
            <li>F</li>
            <li>NTDOY</li>
          </ul>
        </div>

        <div id = "profileStocks" className = "tabcontent">
          <div id = "profileID" className = "profile">
            <h1>{this.state.user? this.state.user.emails[0].address : 'Loading'} Stocks</h1>
            <button className = "btn" onClick = {this.openNav}><strong>Choose Stock</strong></button>

            <h3>{this.state.stockPicked}</h3>
            <h3>{this.state.stockPicked? ("Stock Price: " + this.state.user.stocksOwned[this.firstStock()].currentValue) : ""}</h3>

            {this.state.user&&this.state.stockPicked? <Purchase stockSymbol = {this.state.stockPicked} user = {this.state.user} /> : ""}
            {this.state.user&&this.state.stockPicked? <Sell stockSymbol = {this.state.stockPicked} user = {this.state.user} /> : ""}

            <div id = "stockPrices"></div>

          </div>
        </div>

        <div id = "profileAnalytics" className = "tabcontent">
          <p>Analytics.</p>
        </div>

      </div>
    )
  }
}
