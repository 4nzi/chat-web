import Image from 'next/image'
import { useGetUser } from '../hooks/useGetUser'

interface PROPS {
  formUserID: string
  body: string
  myID: string
}

const Message: React.VFC<PROPS> = ({ formUserID, body, myID }) => {
  const { name, img } = useGetUser(formUserID)

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
      <Image src={img} alt="Avatar" width={50} height={50} />
      <div>
        <h4 className="font-bold">{name}</h4>
        <p className="text-gray-400">{body}</p>
      </div>
    </div>
  )
}

export default Message