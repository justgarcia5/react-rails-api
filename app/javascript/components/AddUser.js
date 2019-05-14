import React from 'react'
import {
  Redirect
} from 'react-router-dom'

import Errors from './Errors'

class AddUser extends React.Component {
  state = {
    errors: null,
    responseOk: false,
    message: null,
    user: {
      first_name: '',
      last_name: '',
      age: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log("User was successfully submitted");
    fetch('/users.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ user: this.state.user })
    }).then((response) => {
      return response.json().then((json) => {
        if (response.status === 201) {
          this.setState({ responseOk: true })
        } else {
          this.setState({
            responseOk: false,
            errors: json,
            message: 'User was successfully Submitted'
          })
        }
        return json
      })
    }).catch((errors) => {
      console.log(errors)
      this.setState({ responseOk: false, errors: { "System Error": ["Unknown problem has occurred"] } })
    })
  }

  handleChange = (event) => {
    const { user } = this.state
    user[event.target.name] = event.target.value
    this.setState({ user: user })
  }

  render() {
    const { user, errors, responseOk, message } = this.state
    // console.log(responseOk, user, errors)

    return (
      <div>
        {responseOk &&
          <Redirect to="/"
          />
        }
        <h1 className='title'>Add User</h1>
        <Errors errors={errors} />
        <div className='container-add-edit'>
          <form onSubmit={this.handleSubmit}>
            <div className='container-input'>
              <label htmlFor='first_name' className='container-label'>First Name: </label>
              <input
                className='input'
                type='text'
                name='first_name'
                value={user.first_name}
                onChange={this.handleChange}
              />
            </div>
            <div className='container-input'>
              <label htmlFor='last_name' className='container-label'>Last Name: </label>
              <input
                className='input'
                type='text'
                name='last_name'
                value={user.last_name}
                onChange={this.handleChange}
              />
            </div>
            <div className='container-input'>
              <label htmlFor='age' className='container-label'>Age: </label>
              <input
                className='input'
                type='text'
                name='age'
                value={user.age}
                onChange={this.handleChange}
              />
            </div>
            <div className='add-user'>
              <button type='submit' >Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default AddUser
