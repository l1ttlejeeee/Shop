import { createContext, useState} from 'react';

const initialValue = {
  name: 'zxc',
  email: 'korovka.korovkina@gmail.com'
}

export const UserContext = createContext(initialValue);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user }} >
      {children}
    </UserContext.Provider>
  );
}