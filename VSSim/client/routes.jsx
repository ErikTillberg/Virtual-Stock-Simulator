import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from './layouts/MainLayout.jsx';

import Landing from './landing/landing.jsx';
import About from './about/about.jsx';

FlowRouter.route('/', {
  action(){
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
