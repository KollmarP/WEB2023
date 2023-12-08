import { api } from "./session";
import { type Exercise  } from "./exercises";

export interface User {
  id?: number,
  firstName: string,
  lastName: string,
  email: string,
  photo: string,
  password: string,
  isAdmin: boolean,
  token?: string
  exercises : Exercise[];
  friends : User[];
}

export function getUsers(): Promise< User[]> {
  return api('users'); 
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  return api(`users/${email}`)
}

export function deleteUser(){
  return api('users/', undefined, 'DELETE')
}