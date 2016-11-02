import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Error404 extends TrackerReact(React.Component){


  render(){
    return (
      <div className = "about">
        <h1>404 Error</h1>
        <p>
          We took a look around the office, but couldn't find your page. I guess
          you're out of luck, sorry pal.
        </p>
      </div>
    )
  }

}
