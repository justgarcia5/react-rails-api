import React from 'react'

import Errors from './Errors'

class EditUser extends React.Component {
  state = {
    responseOk: false,
    users: [],
    userAttributes: {
      first_name: '',
      last_name: '',
      age: ''
    }
  }

  componentDidMount = () => {
    const { userAttributes } = this.state
    fetch(`/users.json`)
    .then((response) => response.json())
    .then((users) => {
      let filteredUsers = users.filter((user) => user.id == this.props.params)
      // console.log(user.id)
      this.setState({
        users: filteredUsers,
        userAttributes: {
          first_name: this.props.first_name,
          last_name: this.props.last_name,
          age: this.props.age
        },
      })
      console.log(users, userAttributes)

    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`/users/${this.props.params}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({tool: this.state.userAttributes})
    }).then((response) => {
      return response.json()
      .then((response) => {
        this.setState({responseOk: true})
      })
    })
  }

  handleChange = (event) => {
    let { userAttributes } = this.state
    userAttributes[event.target.name] = event.target.value
    this.setState({userAttributes: userAttributes})
    console.log(userAttributes)
  }

  render () {
    const { userAttributes } = this.state

    return (
      <div>
        <h1>Edit User</h1>
        {/* <Errors errors={errors}/> */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='first_name'>First Name: </label>
          <input
            type='text'
            name='first_name'
            value={userAttributes.first_name}
            onChange={this.handleChange}
          />
          <br/>
          <label htmlFor='last_name'>Last Name: </label>
          <input
            type='text'
            name='last_name'
            value={userAttributes.last_name}
            onChange={this.handleChange}
          />
          <br/>
          <label htmlFor='age'>Age: </label>
          <input
            type='text'
            name='age'
            value={userAttributes.age}
            onChange={this.handleChange}
          />
          <br/>
          <button type='submit' >Submit</button>
        </form>
      </div>
    )
  }
}

export default EditUser
