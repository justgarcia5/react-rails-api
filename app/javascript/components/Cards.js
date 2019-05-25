import React from 'react'

const Cards = props => (
  <div className='cards-container'>
    <a href={`/edit_users/${props.id}`} >
      <div className='cards-items'>
        <p>
          First Name: <b>{props.firstname}</b>
        </p>
        <p>
          Last Name: <b>{props.lastname}</b>
        </p>
        <p>
          Age: <b>{props.age}</b>
        </p>
      </div>
    </a>
  </div>
)

export default Cards
