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
    let { userAttributes } = this.props
    fetch(`/users.json`)
      .then((response) => response.json())
      .then((users) => {
        let filteredUsers = users.filter((user) => user.id === this.props.params)
        this.setState({
          users: filteredUsers,
          userAttributes: {
            first_name: this.props.firstname,
            last_name: this.props.lastname,
            age: this.props.age,
          },
        })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`/users/${this.props.params}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
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

  handleDelete = (id) => {
    fetch(`/users/${this.props.params}.json`, {
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
    let filteredUsers = this.state.users.filter((user) => user.id !== this.props.params)
    this.setState({ users: filteredUsers })
  }

  handleChange = (event) => {
    let { userAttributes } = this.state
    userAttributes[event.target.name] = event.target.value
    this.setState({ userAttributes: userAttributes })
  }

  render() {
    let { userAttributes, responseOk, errors } = this.state
    console.log(userAttributes)
    return (
      <div>
        {responseOk &&
          <Redirect to="/" />
        }
        <h1 className='title'>Edit User</h1>
        <Errors errors={errors} />
        <div className='container-add-edit'>
          <form onSubmit={this.handleSubmit}>
            <div className='container-input'>
              <label htmlFor='first_name' className='container-label'>First Name: </label>
              <input
                className='input'
                type='text'
                name='first_name'
                value={userAttributes.first_name}
                onChange={this.handleChange}
              />
            </div>
            <div className='container-input'>
              <label htmlFor='last_name' className='container-label'>Last Name: </label>
              <input
                className='input'
                type='text'
                name='last_name'
                value={userAttributes.last_name}
                onChange={this.handleChange}
              />
            </div>
            <div className='container-input'>
              <label htmlFor='age' className='container-label'>Age: </label>
              <input
                className='input'
                type='text'
                name='age'
                value={userAttributes.age}
                onChange={this.handleChange}
              />
            </div>
            <div className='buttons-div'>
              <button className='add-user' type='submit' >Submit</button>
              <button className='delete-user' type='delete' onClick={() => this.handleDelete(this.props.params.id)} type='submit' data-confirm="Are you sure you want to delete this item?" >Delete</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default EditForm
