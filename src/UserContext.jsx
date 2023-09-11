// UserContext.js

import React, { createContext, useState, useContext } from 'react';
import pb from './lib/pocketbase';

const MyContext = createContext();

export function MyProvider({ children }) {
  const [user, setUser] = useState(pb.authStore.model);

  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
}
