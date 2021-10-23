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
      <div className="flex items-center justify-end cursor-text">
        <div className="h-12">
          <p className="p-2 bg-indigo-400 rounded-xl rounded-tr-none text-black">
            {body}
          </p>
        </div>
      </div>
    )

  return (
    <div className="flex gap-2 items-center cursor-text">
      <Image
        src={iconURL || '/default_avatar.jpg'}
        alt="Avatar"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div>
        <h4 className="font-bold text-sm text-gray-400">{userName}</h4>
        <p className="p-2 bg-gray-600 rounded-xl rounded-tl-none">{body}</p>
      </div>
    </div>
  )
}

export default Message
