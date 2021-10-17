import { useState, useEffect } from 'react'
import { db } from '../../firebaseConfig'
import { getDoc, doc } from 'firebase/firestore'

export const useGetUser = (personID: string) => {
  const [name, setName] = useState('')
  const [img, setImg] = useState('/default_avatar.jpg')

  useEffect(() => {
    const getUser = async (id: string) => {
      const userDoc = await getDoc(doc(db, 'users', id))
      setName(userDoc.data()!.name)
      setImg(userDoc.data()!.iconURL || '/default_avatar.jpg')
      console.log('mounted getUser')
    }
    getUser(personID)
  }, [])

  return {
    name,
    img,
  }
}