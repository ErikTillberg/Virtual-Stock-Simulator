import React from 'react';

import AccountsUI from '../AccountsUI.jsx'

export const MainLayout = ({content}) => (
  <div className = "main-layout">
    <header>
      <h2>VSSim</h2>
      <nav>
        <a href = "/About">About</a>
        <a href = "/Support">Support</a>
        <a href = "/">Home</a>
        <AccountsUI />
      </nav>
    </header>
    <main>
      {content}
    </main>
  </div>
)
