import React, {useState} from 'react';
import { AuthContext } from '../context';

function Auth({ children }) {
    const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('user_token'));
    const [currUser, setCurrUser] = useState(localStorage.getItem('user'));

    const login = async () => {
        if (localStorage.getItem('user_token')) {
            setLoggedIn(true);
        }
    }

    const logout = () => {
        if(localStorage.getItem('user_token')) {
            localStorage.clear();
            setLoggedIn(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            login,
            logout,
            currUser,
        }}> 
            {children}
        </AuthContext.Provider>
    )
}

export default Auth;