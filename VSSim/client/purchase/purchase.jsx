import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Purchase extends TrackerReact(React.Component){

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
                <h2>Cash on Hand: ${this.props.user? this.props.user.profile.wallet: 0}</h2>
                <form className="purchaseForm">
                    <p><input id="intNumber" type="number" min="1" max="20" /></p>
                    <p><button data-dismiss = "modal" type = "submit" className = 'purchase-confirm btn'>Confirm Purchase</button></p>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }

}
