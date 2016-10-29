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
  changeStockQuantity(input){

    var userId = input[0];
    var stockSymbol = input[1];
    var change = input[2];

    //.fetch() returns the actual JSON, whereas .find() returns a cursor.
    var user = Meteor.users.find({_id: userId}).fetch();

    if (user.length){ //if user exists add stock to tracked stocks
      var loc = 'stocksOwned.'+stockSymbol; //because you can't do this in the query :(
      Meteor.users.update(
        //push the stock symbol to the database.
        {_id: userId},
        { $inc:
          {
            loc: change
          }
        });
    } else {
      console.error("Could not find user " + userId);
      return;
    }

    var user = Meteor.users.find({_id: userId}).fetch();
    console.log(user);

  }

});
