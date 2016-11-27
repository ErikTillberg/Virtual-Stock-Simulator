//Methods that make changes to a user go here.

import { Meteor } from 'meteor/meteor';

Meteor.methods({

  //method takes a user ID and a stock symbol and updates the user entry
  //in the db to contian that stock symbol.
  addStockAsTracked(input){

    var userId = input[0];
    var stockSymbol = input[1];

    //.fetch() returns the actual JSON, whereas .find() returns a cursor.
    var user = Meteor.users.find({_id: userId}).fetch();

    if (user.length){ //if user exists add stock to tracked stocks
      Meteor.users.update(
        //push the stock symbol to the database.
        {_id: userId},
        { $push:
        {
          trackedStocks: stockSymbol
        }}
      );
    } else {
      console.error("Could not find user " + userId);
      return;
    }
  },
  //This method will change the quantity of stock a person owns, send the
  //userId, the stock the person wants, and the amount the person wants to change
  //(e.g. -5 to sell 5 stocks, 15 to buy 15 stocks)
  purchaseStock(input){

    var stockSymbol = input[0];
    var change = parseInt(input[1]);

    if (isNaN(change)){
      return;
    }
    var user = Meteor.user();
    if(!user) {return;}
    /*
      Rough stock schema:
      [{
        stockSymbol : String
        count : Integer
        lastCost : Decimal
        history: {
          [
            time: new Date()
            priceWhenBought: Decimal
            quantity: Integer
          ]
        }
      }]

    */
    console.log('Getting stock price');
    //if user exists add stock to tracked stocks
    var stockPrice = Meteor.call('getCurrentStockPrice', [stockSymbol]);
    console.log(stockPrice);
    // validates stock symbol
    if (stockPrice){
        console.log('stock price: '+ stockPrice);
        if (stockPrice === 'error'){return 'error'}

        var cashOnHandUpdate = user.cashOnHand;
        var stocksOwned = user.stocksOwned;

        var currCount = parseInt(stocksOwned[stockSymbol] == undefined? 0 : stocksOwned[stockSymbol].count);

        cashOnHandUpdate = cashOnHandUpdate - change*stockPrice;

        stocksOwned[stockSymbol] = {
          count: currCount + change,
          costAtPurchase: stockPrice,
          currentValue: stockPrice
        }

        if (cashOnHandUpdate < 0){
          return "Not enough cash to purchase that many";
        }

        Meteor.users.update(
            {_id: Meteor.user()._id},
            { $set:
            {
              stocksOwned,
              cashOnHand: cashOnHandUpdate
            }
          }, function(error){
            if (error){
              console.log(error);
            }
          }
      );
      return "Successful purchase of " + change + " " + stockSymbol + " stocks";
    }
  },

  sellStock(input){

        var stockSymbol = input[0];
        console.log('change' + change);
        var change = parseInt(input[1]);

        if (change >= 0){console.error("Must be negative number"); return;}
        console.log(stockSymbol, change);
        if (isNaN(change)){
          return;
        }

        var user = Meteor.user();
        if(!user) {return;}
        /*
          Rough stock schema:
          [{
            stockSymbol : String
            count : Integer
            lastCost : Decimal
            history: {
              [
                time: new Date()
                priceWhenBought: Decimal
                quantity: Integer
              ]
            }
          }]

        */
        console.log('Getting stock price');
        //if user exists add stock to tracked stocks
        var stockPrice = Meteor.call('getCurrentStockPrice', [stockSymbol]);
        console.log('stock price: '+ stockPrice);
        if (stockPrice === 'error'){return 'error'}

        var cashOnHandUpdate = user.cashOnHand;
        var stocksOwned = user.stocksOwned;

        var currCount = parseInt(stocksOwned[stockSymbol] == undefined? 0 : stocksOwned[stockSymbol].count);

        cashOnHandUpdate = cashOnHandUpdate - change*stockPrice;

        stocksOwned[stockSymbol] = {
          count: currCount + change,
          costAtPurchase: stocksOwned[stockSymbol].costAtPurchase,
          currentValue: stockPrice
        }

        Meteor.users.update(
            {_id: Meteor.user()._id},
            { $set:
              {
                stocksOwned,
                cashOnHand: cashOnHandUpdate
              }
            }, function(error){
              console.log(error);
            }
        );
        return "Successful sale of " + change + " " + stockSymbol + " stocks";
  }

});
