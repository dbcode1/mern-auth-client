import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useParams
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';   
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import Collections from './main/Collections'
import Search from './main/Search'
import Activate from './auth/Activate'
import App from './App'
import Private from './main/Private'
import Admin from './main/Admin'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import Forgot from './auth/Forgot'
import Reset from './auth/Reset'

const Routes = ({match}) => {

  const [loading, setLoading] = useState(false)
  ;
  return(
    <Router>
          <Switch>
            <Route path="/" exact component={App}>
            </Route>
            <Route path="/signup" exact component={Signup}></Route>
            <Route path="/signin" exact component={Signin}></Route>
            <Route path="/search" exact component={Search}></Route>
            <Route path="/collections" exact component={Collections}></Route>
            <Route path="/auth/activate/:token" exact component={Activate}></Route>
            <PrivateRoute path="/private" exact component={Private}></PrivateRoute>
            <AdminRoute path="/admin" exact component={Admin}></AdminRoute>
            <Route path="/auth/password/forgot" exact component={Forgot}></Route>
            <Route path="/auth/password/reset/:token" exact component={Reset}></Route>
           
          </Switch>
    </Router>
  )
}

export default Routes