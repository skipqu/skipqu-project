// import { auth } from 'firebase-admin';
import pkg from 'firebase-admin';
const {auth} = pkg;

export const createUserWithRole = async (email, password, userType) => {
  const userRecord = await auth().createUser({ email, password });
  await auth().setCustomUserClaims(userRecord.uid, { userType });

  return {
    message: 'User registered successfully',
    uid: userRecord.uid,
    email: userRecord.email,
    userType,
  };
};