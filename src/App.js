import React, {Component} from 'react'
import './App.css'
import * as firebase from 'firebase'
import Navigation from './containers/Navigation'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyC1El82G3drBmmdsfVGryUVueaEK9jASx8',
  authDomain: 'nimblelist-5848a.firebaseapp.com',
  databaseURL: 'https://nimblelist-5848a.firebaseio.com',
  projectId: 'nimblelist-5848a',
  storageBucket: 'nimblelist-5848a.appspot.com',
  messagingSenderId: '655874835247'
}
firebase.initializeApp(config)

var provider = new firebase.auth.GoogleAuthProvider()

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: ''
    }
  }

  googleSignIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.setState({
          user: user.displayName
        })
      } else {
        // No user is signed in.
        firebase.auth().signInWithRedirect(provider)
      }
    })
  }
  componentDidMount () {
    this.googleSignIn()
  }

  render () {
    return (
      <div className='App'>
        <Navigation />
      </div>
    )
  }
}

export default App
