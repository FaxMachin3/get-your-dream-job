import React, { useState } from 'react';
import { LOCAL_STORAGE } from '../constants';
import { User } from '../fake-apis/user-apis';

interface UserContextProviderProps {
    children: React.ReactNode;
}

export const UserContext = React.createContext<{
    currentUser: User | null;
    setCurrentUserAndLocalStorage: ((user: User | null) => void) | null;
}>({
    currentUser: JSON.parse(
        localStorage.getItem(LOCAL_STORAGE.CURRENT_USER) as any
    ),
    setCurrentUserAndLocalStorage: null,
});

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
    children,
}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(
        JSON.parse(localStorage.getItem(LOCAL_STORAGE.CURRENT_USER) as any)
    );
    // console.log({ currentUser });
    const setCurrentUserAndLocalStorage = (user: User | null) => {
        localStorage.setItem(LOCAL_STORAGE.CURRENT_USER, JSON.stringify(user));
        setCurrentUser(user);
    };

    const value = {
        currentUser,
        setCurrentUserAndLocalStorage,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
