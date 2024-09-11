import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase"; // Import auth for logout functionality
import { signOut } from "firebase/auth"; // Import Firebase signOut

// Function to get the user from session storage
const getUserFromSession = () => {
  const storedUser = sessionStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : { email: "", isLoggedIn: false };
};

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromSession);

  // Function to handle user login and store the user in session
  const logIn = (userData) => {
    setUser({ ...userData, isLoggedIn: true });
    sessionStorage.setItem("user", JSON.stringify({ ...userData, isLoggedIn: true }));
  };

  // Function to log out the user and clear session storage
  const logOut = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      setUser({ email: "", isLoggedIn: false });
      sessionStorage.removeItem("user"); // Clear user from session
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  useEffect(() => {
    const storedUser = getUserFromSession();
    if (storedUser.isLoggedIn) {
      setUser(storedUser); // Set user if already in session
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AppContext.Provider>
  );
};
