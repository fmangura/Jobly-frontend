import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';

import Companies from './routes/Companies';
import CompanyJobs from './routes/CompanyJobs';
import AllJobs from './routes/AllJobs';
import LoginForm from './routes/LoginForm';
import SignupForm from './routes/SignupForm';
import ProfileForm from './routes/ProfileForm';
import Home from './routes/Home';
import Nav from './helper_components/Nav';
import Auth from './helper_components/AuthProvider'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Auth>
        <Nav />
        <div className='app-body'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/companies' element={<Companies />}></Route>
            <Route path='/companies/:id' element={<CompanyJobs />}></Route>
            <Route path='/jobs' element={<AllJobs />}></Route>
            <Route path='/profile' element={<ProfileForm />}></Route>
            <Route path='/login' element={<LoginForm />}></Route>
            <Route path='/signup' element={<SignupForm />}></Route>
          </Routes>
        </div>
      </Auth>
      </BrowserRouter>
    </div>
  );
}

export default App;
