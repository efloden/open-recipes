import React, {Component} from 'react'
import './App.css'
import * as firebase from 'firebase'
import Navigation from './components/Navigation'
import RecipeList from './components/RecipeList'

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
      items: undefined,
      itemName: '',
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
    const rootRef = firebase.database().ref()
    const itemsRef = rootRef.child('shopList')
    itemsRef.on('value', snap => {
      this.setState({
        items: snap.val()
      })
    }, function (errorObject) {
      console.error('The read failed: ' + errorObject.code)
    })
    this.googleSignIn()
  }

  handleChange = (event) => {
    this.setState({
      itemName: event.target.value
    })
  }

  render () {
    return (
      <div className='App'>
        <Navigation />
        <RecipeList />
      </div>
    )
  }
}

export default App
