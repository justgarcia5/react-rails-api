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
          />
          {users.first_name}
      </div>
    )
  }
}

export default EditUser
