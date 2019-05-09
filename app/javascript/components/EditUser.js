import React from 'react'

import Errors from './Errors'


class EditUser extends React.Component {
  state = {
    responseOk: false,
    errors: null,
    users: [],
    userAttributes: {
      first_name: '',
      last_name: '',
      age: ''
    }
  }

  componentDidMount = () => {
    let { users } = this.state
    fetch(`/users.json`)
    .then((response) => response.json())
    .then((users) => {
      // console.log( users)
      let filteredUsers = users.filter((user) => user.id == this.props.match.params.id)
        // console.log(user.id, this.props.match.params.id)
      console.log(filteredUsers)
      this.setState({
        users: filteredUsers,
        userAttributes: {
          first_name: this.props.first_name,
          last_name: this.props.last_name,
          age: this.props.age
        },
      })
      console.log(users)
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`/users/${this.props.match.params.id}.json`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: this.state.userAttributes})
    }).then((response) => {
      return response.json().then((json) => {
        if(response.status === 201) {
          this.setState({responseOk: true})
        } else {
          this.setState({responseOk: false, errors: json})
        }
        return json
        })
      }).catch((errors) => {
        console.log(errors )
        this.setState({responseOk: false, errors: {"System Error": ["Unknown problem has occurred"]}})
        })
  }

  handleChange = (event ) => {
    let { userAttributes } = this.state
    userAttributes[event.target.name] = event.target.value
    this.setState({userAttributes: userAttributes})
  }

  render () {
    const { userAttributes, errors, users } = this.state
    // console.log(userAttributes, users)
    return (
      <div>
        <h1>Edit User</h1>
        <Errors errors={errors} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='first_name'>First Name: </label>
          <input
            type='text'
            name='first_name'
            value={userAttributes.id}
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
