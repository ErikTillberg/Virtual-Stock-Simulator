import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from './layouts/MainLayout.jsx';

import Landing from './landing/landing.jsx';
import About from './about/about.jsx';
import Market from './market/market.jsx';
import Profile from './profile/profile.jsx';
import Worldwide from './worldwide/worldwide.jsx';
import Support from './support/support.jsx';

FlowRouter.route('/', {
  action(){
    Meteor.logout(); //You should be logged out if you're ever at the root.
    mount(MainLayout, {
      content: (<Landing />)
    })
  }
});

FlowRouter.route('/about', {
  action(){
    mount(MainLayout, {
      content: (<About />)
    })
  }
});

FlowRouter.route('/market', {
  action(){
    mount(MainLayout, {
      content: (<Market />)
    })
  }
});

FlowRouter.route('/profile',{
  action(){
    mount(MainLayout, {
      content: (<Profile />)
    })
  }
});

FlowRouter.route('/worldwide', {
  action(){
    mount(MainLayout,{
      content:(<Worldwide />)
    })
  }
});

FlowRouter.route('/support', {
  action(){
    mount(MainLayout,{
      content:(<Support />)
    })
  }
});
