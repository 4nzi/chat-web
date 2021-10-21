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

export const updateJoiningRooms = functions.firestore
  .document('rooms/{roomID}/messages/{messageID}')
  .onCreate(async (snap, context) => {
    const roomID = context.params.roomID
    const roomDoc = await db.collection('rooms').doc(roomID).get()
    const users: string[] = await roomDoc.data()!.userIDs
    const body: string = await snap.data()!.body

    for (const i of users) {
      const payload = {
        unreadCount: admin.firestore.FieldValue.increment(1.0),
        body: body,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }
      await db
        .collection('users')
        .doc(i)
        .collection('joiningRooms')
        .doc(roomID)
        .update(payload)
    }
  })
