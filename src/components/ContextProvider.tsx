'use client';
//================================================================
import { createContext, useState, useEffect } from 'react';
//================================================================

const defaultValues = {
  isLoggedIn: false,
  userName: '',

  handleUserLogIn: (userName: string) => {},
  handleLogOut: () => {}
}
//================================================================
export const AppContext = createContext(defaultValues);
//================================================================
export const AppContextProvider = (props: any) => {
  const { children } = props;

  const [userName, setUserName] = useState( defaultValues.userName );
  const [isLoggedIn, setIsLoggedIn] = useState( defaultValues.isLoggedIn );

  useEffect(() => {
    if (typeof window !== undefined) {
      const localUserName = localStorage.getItem('userName');
      const localIsLoggedIn = localStorage.getItem('isLoggedIn');
      if (localUserName && localIsLoggedIn) {
        setUserName(localUserName);
        setIsLoggedIn(Boolean(localIsLoggedIn));
      }
    }
  }, [])

  const handleUserLogIn = (userName: string) => {
    setUserName(userName);
    setIsLoggedIn(true);
    localStorage.setItem('userName', userName);
    localStorage.setItem('isLoggedIn', 'true');
  }

  const handleLogOut = () => {
    setUserName('');
    setIsLoggedIn(false);
    localStorage.removeItem('userName');
    localStorage.removeItem('isLoggedIn');
  }

  return (
    <AppContext.Provider 
      value={
        {
          isLoggedIn,
          // setIsLoggedIn,
          userName,
          // setUserName,
          handleUserLogIn,
          handleLogOut,
        }
      } 
    >
      {children}
    </AppContext.Provider>
  )
}


export default AppContext;