import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import AddUser from '../pages/AddUser'
import EditUser from '../pages/EditUser'
import App from '../pages/App'

const Routes = () => {
  return <Router>
    <div>
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/add_users' exact component={AddUser} />
        <Route path='/edit_users/:id' exact component={EditUser} />
      </Switch>
    </div>
  </Router>
}

export default Routes
