import { Meteor } from 'meteor/meteor';

var http = require("http");
var https = require("https");

var Converter = require("csvtojson").Converter;

Meteor.startup(() => {
  console.log('Starting server...');
  Meteor.publish(null, function() {
    return Meteor.users.find({_id: this.userId}, {fields: {stocksOwned: 1, cashOnHand: 1,username: 1}});
  });
  Meteor.call('updateStockValues');
  Meteor.setInterval(function(){
   Meteor.call('updateStockValues');
  }, 1000*60);
});

//let's client call update methods on a user
Meteor.users.allow({
  update: function(userId, user){
    return true;
  }
});

Meteor.methods({

  getStockHistoricalPrice(data){

    Future = Npm.require('fibers/future');
    var myFuture = new Future();

    https.get({
      host: 'www.google.com',
      path: '/finance/getprices?q='+data[0]+'&i='+String(data[1])+'&p='+String(data[2])+'d&f=d,o,h,l,c,v'
    }, function(response){
      var body = "";
      response.on('data',function(d) {
        body += d;
      });
      response.on('end', function(){

        //parse out the return header and add our own much nicer one:
        data = body.split('\n');
        data.pop();
        for (var i = 0; i < 7; i++){ data.shift(); }
        data.unshift('d,o,h,l,c,v');
        data = data.join('\n');
        if (data === 'd,o,h,l,c,v'){
          return "error";
        }
          //convert the csv to json :)
          var converter = new Converter({});
          converter.fromString(data, function(err, result){
            if (err){
              myFuture.return(err);
            } else {
              myFuture.return(result);
            }
          });
      });
    });
    return myFuture.wait();
  },

  getCurrentStockPrice(data){
    var symbol = data[0];

    //Future is for the asynchronous call.
    Future = Npm.require('fibers/future');
    var myFuture = new Future();

    //example:
    // http://download.finance.yahoo.com/d/quotes.csv?s=SYMBOL&f=sl1po
    https.get({

      host: 'download.finance.yahoo.com',
      path: '/d/quotes.csv?s='+symbol+'&f=sl1po'
    }, function(response){
      var body = "";
      response.on('data',function(d) {
        body += d;
      });
      response.on('end', function(){
        var data = body.split(',');
        if (data[1] == 'N/A') {
          console.log("Could not find stock information for " + symbol);
          myFuture.return('error');
        }
        myFuture.return(data[1]);
      });
    });

    //return the result when it's ready.
    //This is required because otherwise you cannot return things from
    //async methods.
    return myFuture.wait();
  },

  getAllUsers(){
    //rank, name, networth
    var users =  Meteor.users.find({}, {fields: {username:1, stocksOwned:1, cashOnHand: 1}}).fetch();
    console.log(users);

    var ranking = [];

    // generate list of all users
    for (var i = 0; i < users.length; i++)
    {
      console.log(users[i]);

      // stock value
      var stockVal = 0;
      for (var stock in users[i].stocksOwned){
        stockVal += users[i].stocksOwned[stock].count * users[i].stocksOwned[stock].currentValue;
      }

      var usr = {
        name: users[i].username,
        networth: stockVal + users[i].cashOnHand

      };
      ranking.push(usr);
    }

    // apply ranking
    ranking = _.sortBy(ranking, 'networth').reverse();
    for (var i = 1; i <= ranking.length ; i++ ){
      ranking[i-1]['rank'] =  i;

    }


    return ranking;

  }

});
