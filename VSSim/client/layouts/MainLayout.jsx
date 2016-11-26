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
      <a className = "logo-text" href = "/">VSSim</a>
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
