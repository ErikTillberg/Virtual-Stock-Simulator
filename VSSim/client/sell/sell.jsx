import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Purchase extends TrackerReact(React.Component){

  sellStock(){
    var num = document.getElementById('saleCount').value;
    Meteor.call('sellStock', [this.props.stockSymbol, num]);
  }

  render(){
    return (
      <div>
        <button className = "btn" type = "button" data-toggle="modal" data-target = "#sellModal">Sell Stock {this.props.stockSymbol}</button>

        <div id = "sellModal" className = "modal fade" role = "dialog">
          <div className = "modal-dialog">

            <div className = "modal-content">
              <div className = "modal-header">
                <button type = "button" className = "close" data-dismiss = "modal">&times;</button>
                <h3 className = "modal-title">Sell {this.props.stockSymbol}</h3>
              </div>

              <div className = "modal-body">
                <h2>Cash on Hand: ${Meteor.user().cashOnHand.toFixed(2)}</h2>
                <h2>{this.props.stockSymbol} Count: {Meteor.user().stocksOwned[this.props.stockSymbol].count}</h2>
                <h2>{this.props.stockSymbol} Value: {Meteor.user().stocksOwned[this.props.stockSymbol].currentValue}</h2>
                <div className="sellForm">

                    <p><input id="saleCount" type="number" min={"-" + Meteor.user().stocksOwned[this.props.stockSymbol].count} max="-1" /></p>
                    <p><button data-dismiss = "modal" type = "submit" className = 'purchase-confirm btn' onClick = {this.sellStock.bind(this)}>Confirm Sale</button></p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }

}
