// components/ContextProvider.tsx
'use client';
import { createContext, useState, useEffect, ReactNode } from 'react';

type AppContextType = {
  isLoggedIn: boolean;
  username: string;
  locationPictures: any[];
  setLocationPictures: (locationPictures: any[]) => void;
  handleUserLogIn: (userName: string) => void;
  handleLogOut: () => void;
};

const defaultValues: AppContextType = {
  isLoggedIn: false,
  username: '',
  locationPictures: [],
  setLocationPictures: () => {},
  handleUserLogIn: () => {},
  handleLogOut: () => {}
};

export const AppContext = createContext<AppContextType>(defaultValues);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState(defaultValues.username);
  const [isLoggedIn, setIsLoggedIn] = useState(defaultValues.isLoggedIn);
  const [locationPictures, setLocationPictures] = useState(defaultValues.locationPictures);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localUserName = localStorage.getItem('username');
      const localIsLoggedIn = localStorage.getItem('isLoggedIn');
      if (localUserName && localIsLoggedIn) {
        setUsername(localUserName);
        setIsLoggedIn(localIsLoggedIn === 'true');
      }
    }
  }, []);

  const handleUserLogIn = (username: string) => {
    setUsername(username);
    setIsLoggedIn(true);
    localStorage.setItem('username', username);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogOut = () => {
    setUsername('');
    setIsLoggedIn(false);
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        username,
        handleUserLogIn,
        handleLogOut,
        locationPictures,
        setLocationPictures,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
export type { AppContextType };
