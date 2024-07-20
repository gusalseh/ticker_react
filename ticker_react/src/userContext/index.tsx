import React, { createContext, useState, ReactNode } from "react";

interface UserContextType {
  name: string;
  team: string;
  setUserInfo: (name: string, team: string) => void;
}

const defaultContextValue: UserContextType = {
  name: "",
  team: "",
  setUserInfo: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContextValue);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");

  const setUserInfo = (newName: string, newTeam: string) => {
    setName(newName);
    setTeam(newTeam);
  };

  return (
    <UserContext.Provider value={{ name, team, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
