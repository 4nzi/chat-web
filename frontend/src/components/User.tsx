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
  const [isFocus, setIsFocus] = useState(false)
  const [iconURL, setIconURL] = useState('')
  const [userName, setUserName] = useState('')
  const [cutBody, setCutBody] = useState('')

  const router = useRouter()
  const { room } = router.query

  useEffect(() => {
    users.map((user) => {
      if (user.id === personID) {
        setIconURL(user.iconURL)
        setUserName(user.name)
        return
      }
    })

    if (body!.length >= 12) {
      setCutBody(body!.slice(0, 12) + '...')
    } else {
      setCutBody(body!)
    }

    if (room === roomID) {
      setIsFocus(true)
    }
    return () => setIsFocus(false)
  })

  const normalStyle =
    'flex gap-2 items-center p-1 rounded-md delay-75 hover:bg-gray-900'
  const focusStyle = `${normalStyle} bg-gray-700 p-2 rounded-md ease-in-out`
  const style = isFocus ? focusStyle : normalStyle

  return (
    <span onClick={() => router.push(`/?room=${roomID}`)}>
      <div className={style} id="wapper">
        <Image
          src={iconURL || '/default_avatar.jpg'}
          alt="Avatar"
          width={43}
          height={43}
          className="rounded-full"
        />
        <div>
          <h4 className="font-bold">{userName}</h4>
          <p className="text-gray-400">{cutBody}</p>
        </div>
      </div>
    </span>
  )
}

export default User
