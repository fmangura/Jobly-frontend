import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import CompanyCard from '../helper_components/CompanyCard';
import useSearch from '../helper_components/useSearch';
import useLoading from '../helper_components/useLoading';
import { AuthContext } from '../context';
import { Button, Form, Input, Row } from 'reactstrap';
import './Companies.css';

import JoblyApi from '../api';

function Companies(){
    const {isLoggedIn} = useContext(AuthContext);
    if(!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    let {loading, isLoading, doneLoading} = useLoading();
    let [companies, setCompanies] = useState([]);
    let {searchData, handleSearchInput, resetForm} = useSearch({
        name: ''
    });

    useEffect(() => {
        async function loadCompanies() {
            let res = await JoblyApi.getAllCompanies();
            setCompanies(res);
        }
        loadCompanies();
        doneLoading();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (searchData.name){
            isLoading();
            let res = await JoblyApi.getAllCompanies(searchData);
            setCompanies(res);
        } else {
            isLoading();
            let res = await JoblyApi.getAllCompanies();
            setCompanies(res);
        }
        resetForm();
        doneLoading();
    }

    return (
        <div className='contentBody'>
            <div className='search-bar'>
                <Form onSubmit={handleSubmit}>
                    <Input type='text' id='search' name='name' placeholder='Enter search term..' onChange={handleSearchInput} value={searchData.name}></Input>
                    <Button>Search</Button>
                </Form>
            </div>
            {loading ? <p>Loading...</p> : 
            <div className='cardList'>
                {companies.map((company) => {return <CompanyCard key={company.handle} company={company}/>})}
            </div>}
            {(companies.length === 0) ? <p>No results found</p> : null}
        </div>
    );
}

export default Companies;