import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Profile extends TrackerReact(React.Component){

  render(){
    return (
      <div className = "profile">
        <h1>Profile</h1>

      </div>
    )
  }

}
