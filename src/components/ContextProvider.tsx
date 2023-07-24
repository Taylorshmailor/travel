'use client';
//================================================================
import { createContext, useState } from 'react';
//================================================================

const defaultValues = {
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
  
  userName: '',
  setUserName: (value: string) => {},
}
//================================================================
export const AppContext = createContext(defaultValues);
//================================================================
export const AppContextProvider = (props: any) => {
  const { children } = props;

  const [userName, setUserName] = useState(defaultValues.userName);
  const [isLoggedIn, setIsLoggedIn] = useState(defaultValues.isLoggedIn);

  return (
    <AppContext.Provider 
      value={
        {
          isLoggedIn,
          setIsLoggedIn,
          userName,
          setUserName,
        }
      } 
    >
      {children}
    </AppContext.Provider>
  )
}


export default AppContext;