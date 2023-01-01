import { compareSync, hashSync } from 'bcrypt';

export function encodePassword(rawPassword: string) {
  return hashSync(rawPassword, 10);
}

export function comparePassword(rawPassword: string, hashedPassword: string) {
  return compareSync(rawPassword, hashedPassword);
}
