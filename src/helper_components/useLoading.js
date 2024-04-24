import {useState} from 'react';

function useLoading(load=true) {
    const [loading, setLoading] = useState(load);

    function isLoading() {
        setLoading(true);
    }

    function doneLoading() {
        setLoading(false);
    }

    return {loading, isLoading, doneLoading};
}

export default useLoading;