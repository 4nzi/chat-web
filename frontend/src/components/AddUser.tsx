import { useState, ChangeEvent, FormEvent } from 'react'
import { db } from '../../firebaseConfig'
import { collection, doc, getDoc, addDoc, Timestamp } from 'firebase/firestore'
import { useAtom } from 'jotai'
import { usersAtom } from '../store/usersAtom'

interface PROPS {
  myID: string
}

const AddUser: React.VFC<PROPS> = ({ myID }) => {
  const [userID, setUserID] = useState('')
  const [users, setUsers] = useAtom(usersAtom)

  const isAlreadyFriend = () => {
    const ids = users.map((el) => el.id)
    return ids.includes(userID)
  }

  const addUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userRef = doc(db, 'users', userID)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists() && myID !== userID && !isAlreadyFriend()) {
      const payload = {
        userIDs: [myID, userID],
        updatedAt: Timestamp.now(),
      }

      await addDoc(collection(db, 'rooms'), payload)

      setUsers((prev) => [
        ...prev,
        {
          id: userDoc.id,
          name: userDoc.data().name,
          iconURL: userDoc.data().iconURL,
        },
      ])

      setUserID('')
    } else if (myID == userID) {
      alert('追加したいユーザーのIDを入力してください。')
      setUserID('')
    } else if (isAlreadyFriend()) {
      alert('すでに友達です。')
      setUserID('')
    } else {
      alert('ユーザーが見つかりませんでした。')
      setUserID('')
    }
  }

  return (
    <form onSubmit={addUser} className="flex gap-1">
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setUserID(e.target.value)
        }}
        value={userID}
        placeholder="ユーザーIDを入力"
        className="ipt"
        required
      />
      <div className="w-32">
        <button className="btn" type="submit">
          追加
        </button>
      </div>
    </form>
  )
}

export default AddUser
