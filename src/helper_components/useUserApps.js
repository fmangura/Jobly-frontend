import {useState} from 'react';
import JoblyApi from '../api';

function useUserApps(currUser) {
    const [appliedTo, setAppliedTo] = useState([]);
    
    async function getApplied() {
        let res = await JoblyApi.getCurrUser(currUser);
        setAppliedTo(res.applications);
    }

    async function sendApply(id) {
        let res = await JoblyApi.sendApp(currUser, id);
        setAppliedTo(appliedTo => [...appliedTo, res.data.applied]);
    }

    return {appliedTo, getApplied, sendApply};
}

export default useUserApps;