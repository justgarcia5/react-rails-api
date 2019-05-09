import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import AddUser from './AddUser'
import EditUser from './EditUser'
import App from './App'

const Routes = () => {
  return <Router>
    <div>
      <Switch>
        <Route path='/' exact component={App}/>
        <Route path='/add_users' exact component={AddUser}/>
        <Route path='/edit_users/:id' exact component={EditUser}/>
      </Switch>
    </div>
  </Router>
}

export default Routes
