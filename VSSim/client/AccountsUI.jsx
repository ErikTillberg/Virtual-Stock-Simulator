import React from 'react';
import ReactDOM from 'react-dom';

export default class AccountsUI extends React.Component{

  componentDidMount(){
    this.view = Blaze.render(Template.loginRegisterButton,
      ReactDOM.findDOMNode(this.refs.container));
  }

  componentWillUnmount(){
    Blaze.remove(this.view);
  }

  render(){
    return(
      <span ref = "container" />
    )
  }
}
