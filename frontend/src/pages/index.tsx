import type { GetServerSideProps, NextPage } from 'next'
import nookies from 'nookies'
import { firebaseAdmin } from '../../firebaseAdminConfig'
import { UserList, Chat } from '../templates'
import { useGetUsers } from '../hooks/useGetUsers'

const Home: NextPage<{ myID: string }> = ({ myID }) => {
  const {} = useGetUsers(myID)
  return (
    <div className="flex min-h-screen bg-gray-800 text-white">
      <UserList myID={myID} />
      <Chat myID={myID} />
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  const session = cookies.session || ''

  const user = await firebaseAdmin
    .auth()
    .verifySessionCookie(session, true)
    .catch(() => null)

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      myID: user.uid,
    },
  }
}
