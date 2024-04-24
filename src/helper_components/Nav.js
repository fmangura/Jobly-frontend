import React, {useContext} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context';
import './Nav.css';

function Nav() {
    const {isLoggedIn, logout, currUser} = useContext(AuthContext);

    return (
        <div className='Navbar'>
            <div className='title'>
                <Link to={'/'} className='link'>Jobly</Link>
            </div>
                <div className='nav-components'>
                {isLoggedIn ? 
                    <>
                    <Link to={'/companies'} className='link'>Companies</Link>
                    <Link to={'/jobs'} className='link'>Jobs</Link>
                    <Link to={'/profile'} className='link'>Profile</Link>
                    <Link to={'/'} onClick={logout} className='link'>{`Logout (${currUser})`}</Link>
                    </> : 
                    <>
                    <Link to={'/login'} className='link'>Login</Link>
                    <Link to={'/signup'} className='link'>Sign Up</Link>
                    </>}
                </div>
        </div> 
    );
}

export default Nav;