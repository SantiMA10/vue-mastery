import conf from '~/firebase'
import firebase from 'firebase/app'
import flamelink from 'flamelink/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'flamelink/content'
import 'flamelink/storage'

export default function ({
  store,
  redirect
}) {
  if (!firebase.apps.length) {
    const firebaseApp = firebase.initializeApp(conf)
    store.commit('courses/APP_READY', flamelink({ firebaseApp, env: conf.env }))
  }

  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.commit('account/SET_USER', user)
    }
  })
}
