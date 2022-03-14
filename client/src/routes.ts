import React from 'react';

import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

export enum authType {
   AUTH = "AUTH",
   GUEST = "GUEST",
   NOT_NEEDED = "NOT_NEEDED",
}

interface Route {
   path: string;
   component: any;
   auth?: authType;
}

export const routes: Route[] = [
   {
      path: '/',
      component: Home,
      auth: authType.NOT_NEEDED,
   },
   {
      path: '/login',
      component: Login,
      auth: authType.GUEST,
   },
   {
      path: '/register',
      component: Signup,
      auth: authType.GUEST,
   },
]