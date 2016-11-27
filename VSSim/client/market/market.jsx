import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import Purchase from '../purchase/purchase.jsx';

export default class Market extends TrackerReact(React.Component){

  constructor(){
    super();
    this.state = {stockSymbol: "", user: Meteor.user()};
    //setTimeout(function(){ alert("Hello"); }, 3000);
    var self = this;
    setTimeout(function(){
      self.setState({user: Meteor.user()})
    }, 1000);
  }

  displayGraph(e){
    e.preventDefault();

    //There is currently a major problem in that the google finance api
    //only returns up to 67 work days of data. This only goes back to ~August,
    //will likely need to switch API's.

    //Grab the stock symbol from the user input.
    //TODO add error checking (search db of stock symbols for example)
    var symbol = $('[name=stockSymbol]').val();
    symbol = symbol.toUpperCase();

    this.setState({stockSymbol: symbol});
    //Grab the time interval from the user input.
    intervalObj = document.getElementById("interval");
    interval = intervalObj.options[intervalObj.selectedIndex].value;

    //Grab the length of time from the user input.
    lengthObj = document.getElementById("length");
    numDays = lengthObj.options[lengthObj.selectedIndex].value;

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
        for (var i = 0; i < data.length; i++){
          current = data[i];
          if (i===0){
            time = 0
          } else {
            time = parseInt(current.d)
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

  render(){
    let stockSymbol = this.state.stockSymbol;
    let userN = this.state.user;
    return (
      <div className = "market">
        <h1>Marketplace</h1>

        <form onSubmit = {this.displayGraph.bind(this)}>
          <p>Find by Stock Symbol: <input type = "text" name = "stockSymbol"/><input type="submit" value="Get Prices"/></p>
          <p>
            <select id = "length">
              <optgroup label="Length of Time">
                <option value="1">Today</option>
                <option value="30">This Month</option>
                <option value='100'>Max</option>
              </optgroup>
            </select>
            <select id = "interval">
              <optgroup label="Time Interval">
                <option value='3600'>Hourly</option>
                <option value='86400'>Daily</option>
                <option value='604800'>Weekly</option>
              </optgroup>
            </select>
          </p>
        </form>

        <Purchase stockSymbol = {stockSymbol} user = {userN} />

        <div id = "stockPrices"></div>
      </div>
    )
  }

}
