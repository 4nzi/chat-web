import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()
const db = admin.firestore()

export const createJoiningRooms = functions.firestore
  .document('rooms/{roomID}')
  .onCreate(async (snap, context) => {
    const value = snap.data()
    const users: string[] = value.userIDs

    for (const i of users) {
      const personID = users.find((user) => user !== i)
      const payload = {
        personID: personID,
        unreadCount: 0,
        body: 'トークを開始しよう!!',
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }
      await db
        .collection('users')
        .doc(i)
        .collection('joiningRooms')
        .doc(snap.id)
        .set(payload)
    }
  })
