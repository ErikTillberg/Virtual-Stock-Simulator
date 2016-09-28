import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from './layouts/MainLayout.jsx';

import Landing from './landing/landing.jsx';

FlowRouter.route('/', {
  action(){
    mount(MainLayout, {
      content: (<Landing />)
    })
  }
});
