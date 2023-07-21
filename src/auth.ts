import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { Profile } from ".";

export interface SignUpOptions {
  ign: string;
  discordName: string;
}

export async function signIn(email: string, password: string) {
  try {
    let user: User;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        user = userCredential.user;
      })
      .catch((error) => {
        throw new Error(error.message);
      });

    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function signUp(
  email: string,
  password: string,
  options: SignUpOptions
) {
  try {
    let user: User;
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        user = userCredential.user;
      })
      .catch((error) => {
        throw new Error(error.message);
      });

    const profile: Profile = {
      ign: options.ign,
      discordName: options.discordName,
      email: email,
      teamId: "",
    };

    await setDoc(doc(db, "profiles", user.uid), profile).catch((error) => {
      throw new Error(error.message);
    });

    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function signOut() {
  return firebaseSignOut(auth);
}
