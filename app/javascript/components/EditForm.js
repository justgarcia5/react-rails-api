import React from "react"
import { Redirect } from 'react-router-dom'

import Errors from './Errors'

class EditForm extends React.Component {
  state = {
    responseOk: false,
    users: [],
    errors: null,
    userAttributes: {
      first_name: '',
      last_name: '',
      age: ''
    }
  }

  componentDidMount = () => {
    let { userAttributes } = this.state
    fetch(`/users.json`)
      .then((response) => response.json())
      .then((users) => {
        // console.log(users)
        let filteredUsers = users.filter((user) => {
          user.id == this.props.params
        // console.log(filteredUsers[0])
        // console.log(user.first_name)
          console.log(userAttributes)
          this.setState({
            users: filteredUsers,
            userAttributes: {
              first_name: this.props.firstname,
              last_name: this.props.lastname,
              age: this.props.age,
              id: this.props.params
            },
          })
        })
        console.log(this.props)

      })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`/users/${this.props.params}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: this.state.userAttributes })
    }).then((response) => {
      return response.json().then((json) => {
        if (response.status === 201) {
          this.setState({ responseOk: true })
        } else {
          this.setState({ responseOk: false, errors: json })
        }
        return json
      })
    }).catch((errors) => {
      console.log(errors)
      this.setState({
        responseOk: false,
        errors: { "System Error": ["Unknown problem has occurred"] }
      })
    })
  }

  handleChange = (event) => {
    const { userAttributes } = this.state
    userAttributes[event.target.name] = event.target.value
    this.setState({ userAttributes: userAttributes })
    console.log(this.state.userAttributes)
  }

  render() {
    let { userAttributes, responseOk, errors } = this.state
    console.log(this.props.firstname)
    return (
      <div>
        {responseOk &&
          <Redirect to="/" />
        }
        <h1>Edit User</h1>
        <Errors errors={errors} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='first_name'>First Name: </label>
          <input
            type='text'
            name='first_name'
            value={userAttributes.first_name}
            // value={this.props.firstname}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor='last_name'>Last Name: </label>
          <input
            type='text'
            name='last_name'
            value={userAttributes.last_name}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor='age'>Age: </label>
          <input
            type='text'
            name='age'
            value={userAttributes.age}
            onChange={this.handleChange}
          />
          <br />
          <button type='submit' >Submit</button>
        </form>
      </div>
    )
  }
}

export default EditForm