// Cloud Functions for Firebase SDK to create Cloud Functions, setup triggers.
const functions = require('firebase-functions')

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /recipes/:pushId/original
exports.addRecipe = functions.https.onRequest((req, res) => {
  const original = req.query.text
  admin.database().ref('/recipes').push({original: original})
  .then(snapshot => {
    res.redirect(303, snapshot.ref)
  })
})
