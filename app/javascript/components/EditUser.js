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
      const filteredUsers = users.filter((user) => user.id == this.props.match.params.id)
      this.setState({
        user: filteredUsers[0],
      })
    })
  }

  render () {
    const { user } = this.state
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
