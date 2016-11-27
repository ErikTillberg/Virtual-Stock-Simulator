import { Meteor } from 'meteor/meteor';

Meteor.methods({

  //Method runs through all the users and updates the current values of those stocks.
  updateStockValues(){
    console.log("Updating stock prices ...");
    var users = Meteor.users.find().fetch();
    //visited stocks holds info on the stocks that already have prices this iteration
    //to avoid multiple calls to getCurrentStockPrice
    /*
      visitedStocks = [
        {
          symbol: TSLA
          price: 123.00
        }
      ]

    */
    var visitedStocks = [];

    for (var i = 0; i < users.length; i++){
      var currentUser = users[i];

      var uStocks = currentUser.stocksOwned;

      for (var symbol in uStocks){
        var visited = fetchFromVisited(symbol);
        if (visited){ //if we already have the price for that stock
          uStocks[symbol] = {
            count: uStocks[symbol].count,
            costAtPurchase: uStocks[symbol].costAtPurchase,
            currentValue: visited.price
          }

          Meteor.users.update(
              {_id: currentUser._id},
              { $set:
                {
                  uStocks
                }
              }, function(error){

              }
          );
        } else { //otherwise grab the price, then add it to visitedStocks

          //Fetch the price:
          var price = Meteor.call('getCurrentStockPrice', [symbol]);

          uStocks[symbol] = {
            count: uStocks[symbol].count,
            costAtPurchase: uStocks[symbol].costAtPurchase,
            currentValue: price
          }

          Meteor.users.update(
              {_id: currentUser._id},
              { $set:
                {
                  uStocks
                }
              }, function(error){
                if (error){
                  console.log(error);
                }
              }
          );

          visitedStocks.push({'symbol': symbol, 'price': price});

        }
      }

    }

    //function checks visitedStocks for symbol, returns that object if it exists.
    function fetchFromVisited(symbol){
      for (var i = 0; i < visitedStocks.length; i++){
        var currStock = visitedStocks[i];
        if (currStock.symbol === symbol){
          return currStock;
        }
      }
      return null;
    }

  }

});
