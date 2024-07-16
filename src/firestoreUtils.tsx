// firestoreUtils.ts
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { ExtendedWebAppUser } from './types';

export async function saveUserData(user: ExtendedWebAppUser) {
  const userRef = doc(db, 'users', user.id.toString());
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    await setDoc(userRef, user);
  }
}
