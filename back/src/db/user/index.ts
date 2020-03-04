import { ObjectId } from 'mongodb';

import { getDefaultDb } from '../../core/db';
import { User } from './user.types';

const getUsersCollection = async () => {
  const db = await getDefaultDb();
  return db.collection<User>('users');
};

export const insertUser = async (
  email: string,
  password: string,
  date = Date.now()
) =>
  (await getUsersCollection()).insertOne({
    email,
    password,
    signUpDate: date,
    signInDate: date
  });

export const findUserById = async (id: string) =>
  (await getUsersCollection()).findOne({ _id: new ObjectId(id) });

export const findUserByEmail = async (email: string) =>
  (await getUsersCollection()).findOne({ email });

export const updateUserSignInDate = async (id: string) =>
  (await getUsersCollection()).updateOne(
    { _id: new ObjectId(id) },
    { $set: { signInDate: Date.now() } }
  );
