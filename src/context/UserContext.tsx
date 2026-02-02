import { createContext, useState, type ReactNode } from 'react'

type TUserContextType = {
  userName: string
  setUserName: (userName: string) => void
}

export const UserContext = createContext<TUserContextType | undefined>(undefined)

const USER_NAME_STORAGE_KEY = 'userName'

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserNameState] = useState<string>(() => {
    return localStorage.getItem(USER_NAME_STORAGE_KEY) || ''
  })

  const setUserName = (userName: string) => {
    setUserNameState(userName)
    localStorage.setItem(USER_NAME_STORAGE_KEY, userName)
  }

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  )
}
