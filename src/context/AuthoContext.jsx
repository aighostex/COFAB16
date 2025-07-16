// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (email, password) => {
//     // In a real app, this would be an API call
//     if (email === 'admin@confab.com' && password === 'admin123') {
//       setUser({
//         email: 'admin@confab.com',
//         name: 'Admin User',
//         isAdmin: true
//       });
//       return true;
//     } else if (email && password) {
//       setUser({
//         email,
//         name: email.split('@')[0],
//         isAdmin: false
//       });
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };