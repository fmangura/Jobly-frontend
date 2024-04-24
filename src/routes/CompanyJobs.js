import React, { useState, useEffect, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import JoblyApi from '../api';
import JobCards from '../helper_components/JobCards';
import { AuthContext } from '../context';
import useUserApps from '../helper_components/useUserApps';

function CompanyJobs(){
    const {isLoggedIn, currUser} = useContext(AuthContext);
    let {appliedTo, getApplied, sendApply} = useUserApps(currUser);

    if(!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    const {id} = useParams();
    let [currCompany, setCurrCompany] = useState({});
    let [jobsList, setJobsList] = useState([]);

    useEffect(() => {
        async function getCompany() {
            let res = await JoblyApi.getCompany(id);
            setCurrCompany(res);
            setJobsList(res.jobs);
        }
        getApplied();
        getCompany();
    },[])
    

    return (
        <> 
            <h1>{currCompany.name}</h1>
            <p>{currCompany.description}</p>
            <div className='cardList'>
            {jobsList.map(({title, salary, equity, id}) => {return <JobCards key={id} id={id} title={title} salary={salary} equity={equity} company={currCompany.name} applied={appliedTo} sendApply={sendApply}/>})}
            </div>
        </>
    );
}

export default CompanyJobs;