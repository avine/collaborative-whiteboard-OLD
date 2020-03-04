import { ObjectId } from 'mongodb';

import { getDefaultDb } from '../../core/db';
import { User } from './user.types';

const getUsers = async () => {
  const db = await getDefaultDb();
  return db.collection<User>('users');
};

export const insertUser = async (
  email: string,
  password: string,
  date = Date.now()
) =>
  (await getUsers()).insertOne({
    email,
    password,
    signUpDate: date,
    signInDate: date
  });

export const findUserByEmail = async (email: string) =>
  (await getUsers()).findOne({ email });

export const updateUserSignInDate = async (userId: ObjectId) =>
  (await getUsers()).updateOne(
    { _id: userId },
    { $set: { signInDate: Date.now() } }
  );
