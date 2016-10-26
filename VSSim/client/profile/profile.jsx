import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Profile extends TrackerReact(React.Component){

  render(){
    return (
      <div className = "market">
        <h1>Profile</h1>
        <ul>
          <li>
            <a href = "/profile">Profile</a>
          </li>
          <li>
            <a href = "/worldwide">Worldwide</a>
          </li>
          <li>
            <a href = "/market">Market</a>
          </li>
        </ul>
      </div>
    )
  }

}
