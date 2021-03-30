import React, { useState, createContext, useMemo } from 'react';

export const Context = React.createContext();

export const ContextStore = ({ children }) => {
    const [userData, setUserData] = useState(null)
    const providerValue = useMemo(() => ({userData, setUserData}), [userData, setUserData])

    return (
        <Context.Provider value={providerValue}>
            {children}
        </Context.Provider>
    )
}