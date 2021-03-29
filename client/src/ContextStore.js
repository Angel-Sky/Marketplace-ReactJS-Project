import React, { useState } from 'react';

export const Context = React.createContext()

const ContextStore = ({ children }) => {
    const [userData, setUserData] = useState({
        _id: 0,
        email: '',
        phone: ''
    })
    console.log(userData)
    return (
        <Context.Provider value={[userData, setUserData]}>
            {children}
        </Context.Provider>
    )
}

export default ContextStore;