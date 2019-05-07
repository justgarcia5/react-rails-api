import React from "react"
import '../../assets/stylesheets/NavBar.css'


const NavBar = () => {
  return <div className='NavBar'>
      <ul>
        <li>
          <a href='/'>Home</a>
        </li>
        <li>
          <a href='/add_user'>Add User</a>
        </li>
      </ul>
    </div>
}

export default NavBar
