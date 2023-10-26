import { randomBytes, pbkdf2Sync, scrypt } from "crypto";
import bcrypt from 'bcrypt'


export const setPassword = async (password) => {
  return await bcrypt.hash(password, 10);
}

export const validPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
}

