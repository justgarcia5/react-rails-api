import React from 'react'

const Cards = props => (
  <div className='cards-container'>
    <a href={`/edit_users/${props.id}`} >
      <div className='cards-items'>
        <p>
          First Name: {props.firstName}
        </p>
        <p>
          Last Name: {props.lastName}
        </p>
        <p>
          Age: {props.age}
        </p>
      </div>
    </a>
  </div>
)

export default Cards
