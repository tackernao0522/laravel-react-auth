import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import { Button } from 'bootstrap'

export const GlobalNav = () => {
  const history = useHistory()

  const logoutSubmit = (e) => {
    e.preventDefault()

    axios.post(`/api/logout`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token', res.data.token)
        localStorage.removeItem('auth_name', res.data.username)
        swal('ログアウトしました', res.data.message, 'success')
        history.push('/')
        location.reload()
      }
    })
  }

  var AuthButtons = ''

  if (!localStorage.getItem('auth_token')) {
    AuthButtons = (
      <>
        <li>
          <Link to="/register">
            <span>Register</span>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <span>Login</span>
          </Link>
        </li>
      </>
    )
  } else {
    AuthButtons = (
      <li>
        <div onClick={logoutSubmit}>
          <button style={{ color: 'red', cursor: 'pointer' }}>ログアウト</button>
        </div>
      </li>
    )
  }

  return (
    <ul>
      <li>
        <Link to="/">
          <span>Top</span>
        </Link>
      </li>
      <li>
        <Link to="/about">
          <span>About</span>
        </Link>
      </li>
      {AuthButtons}
    </ul>
  )
}
