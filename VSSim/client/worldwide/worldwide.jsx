import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Worldwide extends TrackerReact(React.Component){

  constructor(){
    super();
    this.state = {
      user: Meteor.user()
    }
    var self = this;
    //This is such bad code I'm embarassed but I can't figure out how to fix it.
    setTimeout(function(){
      self.setState({user:Meteor.user()});
    }, 1000);
      this.allusers();
  }

  allusers(){
      var self = this;
      Meteor.call('getAllUsers',function (err, results) {
            if (err){
                console.log("error!");
            }
            else{
                console.log(results);
                self.setState({userlist: results});
            }
      });
  }

  render(){
    return (
      <div className = "worldwide">
        <h2>Worldwide</h2>
        <table className="table table-striped">
          <thead>
          <tr>
            <th>Rank</th>
            <th>User Name</th>
            <th>Net Worth</th>
          </tr>
          </thead>
          <tbody>
          {this.state.user&&this.state.userlist?
              this.state.userlist.map((usr)=> {
                return (
                    <tr>
                      <td>{usr.rank}</td>
                      <td>{usr.name}</td>
                      <td>{usr.networth.toFixed(2)}</td>
                    </tr>)}
              ): <tr><td>Loading..</td></tr>}
          </tbody>
        </table>
      </div>
    )
  }

}
