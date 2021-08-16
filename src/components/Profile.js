import React, { Component } from 'react'
// import { useAuth0 } from "@auth0/auth0-react";
import '../App.css'
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";

class Profile extends Component {
  componentDidMount = () => {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
        .then(result => {
          const jwt = result.__raw;
          const config = {
            headers: { "Authorization": `Bearer ${jwt}` },
            method: 'get',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: '/auth'
          }
          axios(config)
            .then(axiosResults => console.log(axiosResults.data))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }
  }
  render() {
    return (
      <div>
        {
          this.props.auth0.isAuthenticated ?
          <div className='profile'>
            <img src={this.props.auth0.user.picture} alt={this.props.auth0.user.name} />
            <h2>{this.props.auth0.user.name}</h2>
            <p>{this.props.auth0.user.email}</p>
          </div>
          :console.log('error')
        }
      </div>

    )

  }
}

export default withAuth0(Profile)

