import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

export const AuthContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [authWindow, setAuthWindow] = useState(false);
    const [notificationArray, setNotificationArray] = useState([]);
    const [readCount, setReadCount] = useState(10000000000);

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if(user) {
            getBalance();
            getNotifications();
            // setInterval(() => {
            //     getNotifications();
            // }, 5000);
        }
    }, [user]);

    async function getUser() {
        try {
            const res = await axios.get("/user/info");
            if (res.status === 200) {
       
                setUser(res.data.user);
                // getPlayTokenBalance(res.data.user.address);
                setIsAuthenticated(true);
                setIsLoaded(true);
                setReadCount(res.data.user.messageReadCount);
            } else {
                setIsAuthenticated(false);
                setIsLoaded(true);
            }
        } catch (error) {
            setIsAuthenticated(false);
            setIsLoaded(true);
        }
    }

    async function getNotifications() {
        if(user) {
            try {
                const data = await axios.get("/user/notifications");
                if (data.status === 200) {
                    setNotificationArray(data.data.notifications.reverse());
   
                }
            } catch (error) {
     
            }
        }
    }

    async function getBalance() {
        const { data } = await axios.get("/tx/total-token-balance/" + user.address);
        if(data.balance) {
            setBalance(data.balance / 10 ** 6);   
        } else {
            setBalance(0);
        }
    }

    async function logout() {
        try {
            const res = await axios.get("/user/logout");
            if (res.data.success) {
                setUser(null);
                setBalance(0);
                setNotificationArray([]);
                setReadCount(0);
                setIsAuthenticated(false);
                localStorage.removeItem("authMethod");
            }
        } catch (err) {
    
        }
    }

    return (
        <div>
            {!isLoaded ? <h1></h1> :
                <AuthContext.Provider value={{ authWindow, setAuthWindow,readCount, setReadCount, user, setUser, balance, setBalance, getBalance, isAuthenticated, setIsAuthenticated, getUser, notificationArray, logout }}>
                    {children}
                </AuthContext.Provider>}
        </div>
    )
}