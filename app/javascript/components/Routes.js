import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import AddUser from './AddUser'
import App from './App'

const Routes = () => {
  return <Router>
    <div>
      <Switch>
        <Route path='/' exact component={App}/>
        <Route path='/add_user' exact component={AddUser}/>
      </Switch>
    </div>
  </Router>
}

export default Routes
