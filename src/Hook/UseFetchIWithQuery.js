import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UseFetchIWithQuery = (url,headers={}) => {

    const [data,setData] = useState(null);

    useEffect(()=>{
        axios.get(url,headers)
        .then(res => setData(res.data))
        .catch(e => console.log(e.message))
    },[])

    return data
};

export default UseFetchIWithQuery;