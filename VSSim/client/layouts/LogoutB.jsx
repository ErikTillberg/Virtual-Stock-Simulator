import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';

class LogoutButton extends React.Component{

  handleLogout(){
      Meteor.logout();
      FlowRouter.go('/');
  }

  render(){
    return this.props.userId ? <a onClick = {this.handleLogout}>Logout</a> : null;
  }
}

export default LogoutB = createContainer(() => {
  return {
    userId: Meteor.userId()
  };
}, LogoutButton);
