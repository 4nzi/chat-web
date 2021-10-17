import Image from 'next/image'
import { useRouter } from 'next/router'
import { useGetUser } from '../hooks/useGetUser'

interface PROPS {
  roomID: string
  personID: string
  body?: string
  unreadCount: number
}

const User: React.VFC<PROPS> = ({ personID, body, unreadCount, roomID }) => {
  const { name, img } = useGetUser(personID)
  const router = useRouter()

  return (
    <span onClick={() => router.push(`/?room=${roomID}`)}>
      <div className="flex gap-2 items-center" id="wapper">
        <Image src={img} alt="Avatar" width={50} height={50} />
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-gray-400">{body}</p>
        </div>
      </div>
    </span>
  )
}

export default User