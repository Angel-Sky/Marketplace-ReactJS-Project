import { useContext } from 'react';
import { Context } from '../../ContextStore';

function LogOut({ history }) {
    fetch('/auth/logout')
        .then(res => res.json())
        .then(res => {
            history.push('/')
        })
}

export default LogOut;