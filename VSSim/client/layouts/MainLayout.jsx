import React from 'react';
import LogoutButtonContainer from './LogoutB.jsx';
import NavButtonsContainer from './NavButton.jsx';
import AccountsUI from '../AccountsUI.jsx'

function test(){
  console.log(Meteor.userId());
}

export const MainLayout = ({content}) => (
  <div className = "main-layout">
    <header>
      <img style = {{width: '100px', height: 'auto'}} src={'../../images/logo.jpg'}/>
      <nav>
        <NavButtonsContainer />
        <a href = "/About">About</a>
        <a href = "/Support">Support</a>
        <LogoutButtonContainer />
      </nav>
    </header>
    <main>
      {content}
    </main>
  </div>
)
