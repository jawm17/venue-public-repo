import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

export const AlertContext = createContext();

export default ({ children }) => {
    const [alert, setAlert] = useState({alertText: ""});

    return (
        <AlertContext.Provider value={{ alert, setAlert }}>
            {children}
        </AlertContext.Provider>
    )
}