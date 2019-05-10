import React from 'react'

import EditForm from './EditForm'

class EditUser extends React.Component {
  state = {
    user: [],
  }

  componentDidMount = () => {
    fetch(`/users.json`)
      .then((response) => response.json())
      .then((users) => {
        // console.log(users)
        let filteredUsers = users.filter((user) => user.id == this.props.match.params.id)
        // console.log(filteredUsers[0])
        this.setState({
          user: filteredUsers[0],
        })
        // console.log(this.state.user)
      })
  }

  render() {
    const { user } = this.state
    // console.log(user.first_name)
    return (
      <div>
        <EditForm
          firstname={user.first_name}
          lastname={user.last_name}
          age={user.age}
          params={this.props.match.params.id}
        />
      </div>
    )
  }
}

export default EditUser
