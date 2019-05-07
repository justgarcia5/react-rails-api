import React from "react"
import '../../assets/stylesheets/application.css'

class App extends React.Component {
  state = {
    users: [],
    errors: null
  }

  componentDidMount = () => {
    fetch('/users.json')
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          users: json,
        })
      })
    }

    render () {
    return (
      <div className='App'>
        <h1>User List</h1>
        <ul>
          { this.state.users.map((user) =>
            <li key={user.id}>
              First Name: {user.first_name}, Last Name: {user.last_name}, Age: {user.age}
            </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default App
