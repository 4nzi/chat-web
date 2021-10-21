import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { usersAtom } from '../store/usersAtom'

interface PROPS {
  roomID: string
  personID: string
  body?: string
  unreadCount: number
}

const User: React.VFC<PROPS> = ({ personID, body, unreadCount, roomID }) => {
  const [users] = useAtom(usersAtom)
  const router = useRouter()
  const [iconURL, setIconURL] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    users.map((user) => {
      if (user.id === personID) {
        setIconURL(user.iconURL)
        setUserName(user.name)
        return
      }
    })
  })

  return (
    <span onClick={() => router.push(`/?room=${roomID}`)}>
      <div className="flex gap-2 items-center" id="wapper">
        <Image
          src={iconURL || '/default_avatar.jpg'}
          alt="Avatar"
          width={50}
          height={50}
        />
        <div>
          <h4 className="font-bold">{userName}</h4>
          <p className="text-gray-400">{body}</p>
        </div>
      </div>
    </span>
  )
}

export default User
