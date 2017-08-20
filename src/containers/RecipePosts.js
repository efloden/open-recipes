import React, { Component } from 'react'
import '../App.css'
import * as firebase from 'firebase'
import {
} from 'react-bootstrap'

class Navigation extends Component {
  postRecipe = () => {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }, function (error) {
      // An error happened.
      console.error(error)
    })
  }
  render () {
    return (
      <div>Post Recipes</div>
    )
  }
}

export default Navigation
