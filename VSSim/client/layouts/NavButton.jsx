import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';

class NavButtons extends React.Component{

  render(){
    return this.props.userId ?
    <span className = "loggedInNav">
      <a href = "/profile">Profile</a>
      <a href = "/worldwide">Worldwide</a>
      <a href = "/market">Market</a>
    </span> : null;
  }
}

export default NavButtonsContainer = createContainer(() => {
  return {
    userId: Meteor.userId()
  };
}, NavButtons);
