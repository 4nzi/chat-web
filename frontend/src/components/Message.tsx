import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useAtom } from 'jotai'
import { usersAtom } from '../store/usersAtom'

interface PROPS {
  formUserID: string
  body: string
  myID: string
}

const Message: React.VFC<PROPS> = ({ formUserID, body, myID }) => {
  const [users] = useAtom(usersAtom)
  const [iconURL, setIconURL] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    users.map((user) => {
      if (user.id === formUserID) {
        setIconURL(user.iconURL)
        setUserName(user.name)
        return
      }
    })
  })

  if (formUserID === myID)
    return (
      <div className="flex gap-2 items-center justify-end">
        <div className="h-12">
          <p className="text-gray-400">{body}</p>
        </div>
      </div>
    )

  return (
    <div className="flex gap-2 items-center">
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
  )
}

export default Message
