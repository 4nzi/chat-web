import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useAtom } from 'jotai'
import { usersAtom } from '../store/usersAtom'
import { useAuth } from '../hooks/useAuth'

const MyProf: React.VFC<{ myID: string }> = ({ myID }) => {
  const { logout } = useAuth()
  const [users] = useAtom(usersAtom)
  const [iconURL, setIconURL] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    users.map((user) => {
      if (user.id === myID) {
        setIconURL(user.iconURL)
        setUserName(user.name)
      }
    })
    console.log('mounted MyProf')
  }, [users])

  function copyMyID() {
    navigator.clipboard.writeText(myID).then(
      function () {
        console.log('Copying to clipboard was successful!')
      },
      function (err) {
        console.error(err)
      }
    )
  }

  return (
    <div className="flex gap-2 items-center" id="wapper">
      <Image
        src={iconURL || '/default_avatar.jpg'}
        alt="Avatar"
        width={43}
        height={43}
        className="rounded-full"
      />
      <h4 className="font-bold">{userName}</h4>
      <div className="pt-2 opacity-50">
        <span
          onClick={copyMyID}
          className="ml-auto cursor-pointer hover:opacity-50 "
        >
          <Image src="/copy.png" alt="copy my id" width={19} height={20} />
        </span>
      </div>

      <div className="ml-auto ">
        <span
          onClick={logout}
          className="ml-auto cursor-pointer hover:opacity-50 text-gray-400"
        >
          ログアウト
        </span>
      </div>
    </div>
  )
}

export default MyProf
