import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context';

function Home() {
    const {currUser, isLoggedIn} = useContext(AuthContext);
    if(!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div>
            <h2>Jobly</h2>
            <p>All the jobs in one, convenient place.</p>
            <h3>Welcome back, {currUser}</h3>
        </div>
    );
}

export default Home;