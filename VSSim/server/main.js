import { Meteor } from 'meteor/meteor';

var http = require("http");
var https = require("https");

var Converter = require("csvtojson").Converter;

Meteor.startup(() => {
  console.log('Starting server...');
});

Meteor.methods({

  getStockPrice(data){

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
        //console.log(data);
        for (var i = 0; i < 7; i++){ data.shift(); }
        data.unshift('d,o,h,l,c,v');
        data = data.join('\n');
        //console.log(data);
          //convert the csv to json :)
          var converter = new Converter({});
          converter.fromString(data, function(err, result){
            if (err){
              myFuture.return(err);
            } else {
              //console.log(result);
              myFuture.return(result);
            }
          });
      });
    });
    return myFuture.wait();
  },

  getStockInfo(stock){

    Future = Npm.require('fibers/future');
    var myFuture = new Future();

    https.get({
      host: 'www.google.com',
      path: '/finance/info?q='+stock
    }, function(response){
      var body = "";
      response.on('data',function(d) {
        body += d;
      });
      response.on('end', function(){

        data = body.split('\n');
        data.pop();

        for (var i = 0; i < 3; i++){ data.shift(); }
        data = data.join('\n');

        //console.log(data);
        //convert the csv to json :)
        var converter = new Converter({});
        converter.fromString(data, function(err, result){
          if (err){
            myFuture.return(err);
          } else {

            console.log(result);

            myFuture.return(result);
          }
        });
      });
    });
    return myFuture.wait();
  }

});
