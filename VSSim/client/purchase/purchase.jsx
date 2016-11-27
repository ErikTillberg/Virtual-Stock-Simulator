import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Purchase extends TrackerReact(React.Component){

  purchaseStock(){
    var num = document.getElementById('intNumber').value;
    Meteor.call('purchaseStock', [this.props.stockSymbol, num]);
  }

  render(){
    return (
      <div>
        <button className = "btn" type = "button" data-toggle="modal" data-target = "#purchaseModal">Purchase Stock {this.props.stockSymbol}</button>

        <div id = "purchaseModal" className = "modal fade" role = "dialog">
          <div className = "modal-dialog">

            <div className = "modal-content">
              <div className = "modal-header">
                <button type = "button" className = "close" data-dismiss = "modal">&times;</button>
                <h3 className = "modal-title">Purchase {this.props.stockSymbol}</h3>
              </div>
              <div className = "modal-body">
                <h3>Cash on Hand: ${Meteor.user().cashOnHand.toFixed(2)}</h3>
                <h3>{this.props.stockSymbol} Cost: ${Meteor.user().stocksOwned[this.props.stockSymbol].currentValue}</h3>
                <div className="purchaseForm">
                    <p><input id="intNumber" type="number" min="1" max="20" /></p>
                    <p><button data-dismiss = "modal" type = "submit" className = 'purchase-confirm btn' onClick = {this.purchaseStock.bind(this)}>Confirm Purchase</button></p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }

}
