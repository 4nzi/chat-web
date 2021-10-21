import { atom } from 'jotai'

interface USER {
  id: string
  name: string
  iconURL: string
}

export const usersAtom = atom<USER[]>([])
