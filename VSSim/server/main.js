import { Meteor } from 'meteor/meteor';

var http = require("http");
var https = require("https");

var Converter = require("csvtojson").Converter;

Meteor.startup(() => {
  console.log('Starting server...');
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
    console.log('-------------------' + symbol);
    //Future is for the asynchronous call.
    Future = Npm.require('fibers/future');
    var myFuture = new Future();

    //example:
    // http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22AAPL%22)&format=json&env=http://datatables.org/alltables.env

    https.get({
      host: 'query.yahooapis.com',
      path: '/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22'+symbol+'%22)&format=json&env=http://datatables.org/alltables.env'
    }, function(response){
      var body = "";
      response.on('data',function(d) {
        body += d;
      });
      response.on('end', function(){
        var data = JSON.parse(body);
        console.log(data.query.results.quote.Ask);
        //parse out the return header and add our own much nicer one:
        myFuture.return(data.query.results.quote.Ask);
      });
    });

    //return the result when it's ready.
    //This is required because otherwise you cannot return things from
    //async methods.
    return myFuture.wait();
  }
});
