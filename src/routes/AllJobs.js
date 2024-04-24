import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import useSearch from '../helper_components/useSearch';
import JoblyApi from '../api';
import JobCards from '../helper_components/JobCards';
import useLoading from '../helper_components/useLoading';
import { AuthContext } from '../context';
import useUserApps from '../helper_components/useUserApps';
import { Form, Button, Input } from 'reactstrap';

function AllJobs(){
    const {isLoggedIn, currUser} = useContext(AuthContext);
    let {appliedTo, getApplied, sendApply} = useUserApps(currUser);
    let {loading, isLoading, doneLoading} = useLoading();
    
    if(!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    let [allJobs, setAllJobs] = useState([]);
    let {searchData, handleSearchInput, resetForm } = useSearch({
        title: '',
    })

    useEffect(() => {
        async function getJobs() {
            let res = await JoblyApi.getJobs();
            setAllJobs(res);
        }

        // async function getApplied() {
        //     let res = await JoblyApi.getCurrUser(currUser);
        //     setAppliedTo(res.applications);
        // }
        getApplied();
        getJobs();
        doneLoading();
    },[])


    async function handleSubmit(e) {
        e.preventDefault();
        if (searchData.title){
            isLoading();
            let res = await JoblyApi.getJobs(searchData);
            setAllJobs(res);
        } else {
            isLoading();
            let res = await JoblyApi.getJobs();
            setAllJobs(res);
        }
        resetForm();
        doneLoading();
    }

    // async function sendApply(id) {
    //     let res = await JoblyApi.sendApp(currUser, id);
    //     setAppliedTo(appliedTo => [...appliedTo, res.data.applied]);
    // }

    return (
        <> 
            <div className='contentBody'>
                <div className='search-bar'>
                    <Form onSubmit={handleSubmit}>
                        <Input type='text' id='title' name='title' placeholder='Enter search term..' onChange={handleSearchInput} value={searchData.name}></Input>
                        <Button>Search</Button>
                    </Form>
                </div>
            </div>
            {loading ? <p>Loading...</p> : 
            <div className='cardList'>
                {allJobs.map(({title, salary, equity, id, companyName}) => {
                        return <JobCards key={id} id={id} title={title} salary={salary} equity={equity} company={companyName} applied={appliedTo} sendApply={sendApply}/>
                })}
            </div>}
            {(allJobs.length === 0) ? <p>No results found</p> : null}

        </>
    );
}

export default AllJobs;