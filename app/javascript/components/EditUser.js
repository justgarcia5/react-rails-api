import React from 'react'

import EditForm from './EditForm'

class EditUser extends React.Component {
  state = {
    users: [],
  }

  componentDidMount = () => {
    fetch(`/users.json`)
      .then((response) => response.json())
      .then((users) => {
        // console.log(users)
        let filteredUsers = users.filter((user) => user.id == this.props.match.params.id)
        // console.log(filteredUsers[0])
        this.setState({
          users: filteredUsers[0],
        })
        // console.log(this.state.user)
      })
  }

  handleDelete = (id) => {
    fetch(`/users/${this.props.match.params.id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        this.deleteUser(id)
      })
  }

  deleteUser = (id) => {
    let filteredUsers = this.state.users.filter((user) => user.id !== id)
    this.setState({ users: filteredUsers })
  }

  render() {
    let { users } = this.state
    // console.log(users)
    return (
      <div>
        <EditForm
          firstname={users.first_name}
          lastname={users.last_name}
          age={users.age}
          params={this.props.match.params.id}
          handleDelete={this.handleDelete}
        />
      </div>
    )
  }
}

export default EditUser
