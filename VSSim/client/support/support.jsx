import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Support extends TrackerReact(React.Component){


  render(){
    return (
      <div className = "support">
        Support Page
      </div>
    )
  }

}
