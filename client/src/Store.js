import React, { useState } from 'react';

export const Context = React.createContext()

const Store = ({ children }) => {
    const [state, setState] = useState({
        name: 'Not Specified',
        email: '',
        phone: '',
        _id: 0
    })

    return (
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    )
}

export default Store;