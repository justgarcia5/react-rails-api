import React from "react"

import Cards from './Cards'

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

  render() {
    return (
      <div>
        <h1 className='title'>User List</h1>
        <div className='cards-grid'>
          {this.state.users.map((user, index) =>
            <Cards
              key={index}
              firstName={user.first_name}
              lastName={user.last_name}
              age={user.age}
              id={user.id}
            />
          )
          }
        </div>
      </div>
    );
  }
}

export default App
