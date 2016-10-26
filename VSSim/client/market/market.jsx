import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Market extends TrackerReact(React.Component){

  displayGraph(e){
    e.preventDefault();
    var symbol = $('[name=stockSymbol]').val();
    symbol = symbol.toUpperCase();
    if (symbol.length != 4) {console.log("error with symbol");return;}
    interval = 86400;
    numDays = 10;
    Meteor.call('getStockPrice', [symbol, interval, numDays], function(err, data){
      if (err){
        console.error("Error getting stock info");
      } else {
        //console.log(data)

        var dates = [];
        var prices = [];
        initTime = data[0].d;
        initTime = parseInt(initTime.substring(1, initTime.length));
        data[0].d = 0;
        for (var i = 0; i < data.length; i++){
          current = data[i];
          date = new Date((initTime + i*interval)*1000)
          dates.push(date);
          prices.push(current.c)
        }

        var trace1 = {
          x: dates,
          y: prices,
          type: 'scatter'
        };

        var data = [trace1];

        Plotly.newPlot('stockPrices', data);

      }
    });
  }

  render(){
    return (
      <div className = "market">
        <h1>Marketplace</h1>

        <form onSubmit = {this.displayGraph}>
          <p>Find by Stock Symbol: <input type = "text" name = "stockSymbol"/><input type="submit" value="Get Prices"/></p>
        </form>

        <div id = "stockPrices"></div>

      </div>
    )
  }

}
