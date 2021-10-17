import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { db } from '../../firebaseConfig'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { Message, NoResults } from '../components/index'

interface MESSAGE {
  formUserID: string
  body: string
}

const Chat: React.VFC<{ myID: string }> = ({ myID }) => {
  const [messages, setMessages] = useState<MESSAGE[]>([])
  const router = useRouter()
  const { room } = router.query

  useEffect(() => {
    const roomsRef = collection(db, `rooms/${room}/messages`)
    const q = query(roomsRef, orderBy('createdAt'))
    const unSub = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          formUserID: doc.data()!.formUserID,
          body: doc.data()!.body,
        }))
      )
    })
    console.log('mounted Comments')
    return () => unSub()
  }, [room])

  if (!room) return <NoResults />
  return (
    <main className=" w-full">
      <ul className="flex flex-col gap-2 p-3 ">
        {messages?.map((message: MESSAGE, i: number) => (
          <li key={i} className="cursor-pointer  ">
            <Message
              body={message.body}
              formUserID={message.formUserID}
              myID={myID}
            />
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Chat