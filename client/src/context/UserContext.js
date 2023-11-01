import React, { createContext, useState, useEffect } from 'react';
import { magic } from './magic';
export const UserContext = createContext(null);

export default ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        setUser({ loading: true });
        magic.user.isLoggedIn().then((isLoggedIn) => {
            return isLoggedIn
                ? magic.user.getMetadata().then((userData) => setUser(userData))
                : setUser({ user: null });
        });
    }, []);

    return (
        <div>
            <UserContext.Provider value={{ user, setUser }}>
                {children}
            </UserContext.Provider>
        </div>
    )
}