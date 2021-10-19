import { useState, ChangeEvent, FormEvent } from 'react'
import { db } from '../../firebaseConfig'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

interface PROPS {
  myID: string
  roomID: string | string[]
}

const AddUser: React.VFC<PROPS> = ({ myID, roomID }) => {
  const [message, setMassage] = useState('')

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload = {
      formUserID: myID,
      body: message,
      createdAt: Timestamp.now(),
    }
    const roomsRef = collection(db, `rooms/${roomID}/messages`)
    await addDoc(roomsRef, payload)
    setMassage('')
  }

  return (
    <form onSubmit={addMessage} className="flex gap-1 fixed bottom-4 z-10">
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setMassage(e.target.value)
        }}
        value={message}
        placeholder="メッセージを入力"
        className="ipt"
        required
      />
      <div className="w-20">
        <button className="btn" type="submit">
          送信
        </button>
      </div>
    </form>
  )
}

export default AddUser
