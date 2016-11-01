import { Meteor } from 'meteor/meteor';

var http = require("http");
var https = require("https");

var Converter = require("csvtojson").Converter;

Meteor.startup(() => {
  console.log('Starting server...');
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

    //Future is for the asynchronous call.
    Future = Npm.require('fibers/future');
    var myFuture = new Future();

    https.get({
      host: 'www.google.com',
      path: '/finance/getprices?q='+data[0]+'&i=0&p=0d&f=d,c,h,l,o,v'
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
        data.unshift('date,c,h,l,o,v');
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

    //return the result when it's ready.
    //This is required because otherwise you cannot return things from
    //async methods.
    return myFuture.wait();

  }

});
