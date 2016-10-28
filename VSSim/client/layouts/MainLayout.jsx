import React from 'react';
import LogoutB from './LogoutB.jsx';
import AccountsUI from '../AccountsUI.jsx'

function test(){
  console.log(Meteor.userId());
}

export const MainLayout = ({content}) => (
  <div className = "main-layout">
    <header>
      <h2>VSSim</h2>
      <nav>
        <a href = "/About">About</a>
        <a href = "/Support">Support</a>
        <a href = "/">Home</a>
        <LogoutB />
      </nav>
    </header>
    <main>
      {content}
    </main>
  </div>
)
