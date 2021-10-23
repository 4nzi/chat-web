import { useEffect } from 'react'
import { db } from '../../firebaseConfig'
import { getDocs, getDoc, doc, collection } from 'firebase/firestore'
import { useAtom } from 'jotai'
import { usersAtom } from '../store/usersAtom'

export const useGetUsers = async (myID: string) => {
  const [users, setUsers] = useAtom(usersAtom)

  useEffect(() => {
    const getUsers = async (myID: string) => {
      const roomsRef = collection(db, `users/${myID}/joiningRooms`)
      const roomDocs = await getDocs(roomsRef)

      roomDocs.forEach(async (room) => {
        const userRef = doc(db, 'users', room.data()!.personID)
        const userDoc = await getDoc(userRef)
        const value = userDoc.data()
        setUsers((prev) => [
          ...prev,
          {
            id: userDoc.id,
            name: value!.name,
            iconURL: value!.iconURL,
          },
        ])
      })

      const myRef = doc(db, 'users', myID)
      const myDoc = await getDoc(myRef)
      const myProf = myDoc.data()
      setUsers((prev) => [
        ...prev,
        {
          id: myDoc.id,
          name: myProf!.name,
          iconURL: myProf!.iconURL,
        },
      ])
    }

    getUsers(myID)
    console.log('mounted useGetUsers')
  }, [])

  return { users }
}
