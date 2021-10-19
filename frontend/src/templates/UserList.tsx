import { useState, useEffect } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { User, AddUser } from '../components/index'

interface USER {
  roomID: string
  personID: string
  body?: string
  unreadCount: number
}

const UserList: React.VFC<{ myID: string }> = ({ myID }) => {
  const [users, setUsers] = useState<USER[]>([])

  useEffect(() => {
    const roomsRef = collection(db, `users/${myID}/joiningRooms`)
    const q = query(roomsRef, orderBy('updatedAt', 'desc'))
    const unSub = onSnapshot(q, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          roomID: doc.id,
          personID: doc.data().personID,
          body: doc.data().body,
          unreadCount: doc.data().unreadCont,
        }))
      )
    })
    console.log('mounted UserList')
    return () => unSub()
  }, [])

  return (
    <aside className="bg-gray-900 w-96 p-3 ">
      <AddUser myID={myID} />
      <ul className="flex flex-col gap-2">
        {users?.map((user: USER, i: number) => (
          <li key={i} className="cursor-pointer ">
            <User
              roomID={user.roomID}
              personID={user.personID}
              body={user.body}
              unreadCount={user.unreadCount}
            />
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default UserList
