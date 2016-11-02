import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from './layouts/MainLayout.jsx';

import Landing from './landing/landing.jsx';
import About from './about/about.jsx';
import Market from './market/market.jsx';
import Profile from './profile/profile.jsx';
import Worldwide from './worldwide/worldwide.jsx';
import Support from './support/support.jsx';
import Error404 from './404/404.jsx';

FlowRouter.notFound = {
  action(){
    FlowRouter.go('/404');
  }
}

FlowRouter.route('/', {
  action(){
    Meteor.logout(); //You should be logged out if you're ever at the root.
    mount(MainLayout, {
      content: (<Landing />)
    })
  }
});

FlowRouter.route('/404', {
  action(){
    mount(MainLayout, {
      content: (<Error404 />)
    })
  }
})

FlowRouter.route('/about', {
  action(){
    mount(MainLayout, {
      content: (<About />)
    })
  }
});

FlowRouter.route('/market', {
  action(){
    if (Meteor.userId()){
      mount(MainLayout, {
        content: (<Market />)
      })
    } else {
      FlowRouter.go('/');
    }
  }
});

FlowRouter.route('/profile',{
  action(){
    if (Meteor.userId()){
      mount(MainLayout, {
        content: (<Profile />)
      })
    } else {
      FlowRouter.go('/');
    }

  }
});

FlowRouter.route('/worldwide', {
  action(){
    if (Meteor.userId()){
      mount(MainLayout,{
        content:(<Worldwide />)
      })
    } else {
      FlowRouter.go('/');
    }

  }
});

FlowRouter.route('/support', {
  action(){
    mount(MainLayout,{
      content:(<Support />)
    })
  }
});
