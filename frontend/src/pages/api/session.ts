import type { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import { setCookie } from 'nookies'
import { firebaseAdmin } from '../../../firebaseAdminConfig'

export default async function sessionApi(req: Req, res: Res) {
  if (req.method !== 'POST') return res.status(404).send('Not Found')

  const auth = firebaseAdmin.auth()
  const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5日
  const id = (JSON.parse(req.body).id || '').toString()
  const sessionCookie = await auth.createSessionCookie(id, { expiresIn })
  const options = {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    path: '/',
  }

  // セッションIDをCookieに設定する
  setCookie({ res }, 'session', sessionCookie, options)

  res.send(JSON.stringify({ status: 'success' }))
}
