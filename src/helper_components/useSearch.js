import {useState} from 'react';

function useSearch(initialState) {
    const [searchData, setSearchData] = useState(initialState);

    function handleSearchInput(e) {
        let {name, value} = e.target;
        setSearchData(searchData => ({...searchData, [name]:value}));
    }

    const resetForm = () => {
        setSearchData(initialState);
    }

    return {searchData, handleSearchInput, resetForm};
}

export default useSearch;