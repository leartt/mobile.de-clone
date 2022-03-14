import React, { Component } from 'react'

import { Route, Redirect, RouteProps } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { useSelector } from 'react-redux'
import { State } from './state/reducers/index'


interface ProtectedRouteProps extends RouteProps {
   // beacuse component can be undefined we need to override and remove undefined type ==> (or check line 17)
   component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
   const isLoggedIn = useSelector((state: State) => state.auth.isLoggedIn)

   // can work also by checking if !Component ==> (or check line 10)
   // if (!Component) return null;

   return (
      <Route {...rest} render={(props) => (
         isLoggedIn ? <Component {...props} />
            : <Redirect to={{
               pathname: '/login',
               state: { from: props.location, message: 'Please login to continue' }
            }} />
      )}
      />
   )
}

export default ProtectedRoute