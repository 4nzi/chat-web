import { useState, ChangeEvent, FormEvent } from 'react'
import { auth, db } from '../../firebaseConfig'
import { collection, setDoc, doc } from 'firebase/firestore'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'

export const useAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')

  const emailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const userNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  const createUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      if (result.user) {
        const payload = {
          name: userName,
          iconURL: '',
        }
        const usersRef = collection(db, 'users')
        await setDoc(doc(usersRef, result.user.uid), payload)
      }
    } catch (e: any) {
      alert(e.message)
    }
  }

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e: any) {
      alert(e.message)
    }
  }

  return {
    email,
    password,
    userName,
    emailChange,
    passwordChange,
    userNameChange,
    createUser,
    login,
  }
}
