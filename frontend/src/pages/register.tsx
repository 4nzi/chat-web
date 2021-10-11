import Link from 'next/link'
import { NextPage } from 'next'
import { useAuth } from '../hooks/useAuth'

const Register: NextPage = () => {
  const {
    email,
    password,
    userName,
    emailChange,
    passwordChange,
    userNameChange,
    createUser,
  } = useAuth()

  return (
    <main className="flex justify-center items-center flex-col min-h-screen bg-indigo-500 text-white">
      <form
        className="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
        onSubmit={createUser}
      >
        <h1 className=" text-white font-bold mb-4 text-center text-2xl text">
          アカウント作成
        </h1>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            メールアドレス
          </label>
          <input
            className="ipt"
            type="email"
            value={email}
            onChange={emailChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            ユーザー名
          </label>
          <input
            className="ipt"
            type="text"
            value={userName}
            onChange={userNameChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            パスワード
          </label>
          <input
            className="ipt"
            type="password"
            placeholder="8文字以上の半角英数字"
            required
            pattern="^([a-zA-Z0-9]{8,})$"
            value={password}
            onChange={passwordChange}
          />
        </div>
        <div className="mb-2">
          <button className="btn" type="submit">
            作成
          </button>
        </div>
        <Link href="/login">
          <a className="text-sm text-blue-400 hover:border-b border-blue-400 cursor-pointer">
            すでにアカウントをお持ちですか？
          </a>
        </Link>
      </form>
    </main>
  )
}

export default Register
