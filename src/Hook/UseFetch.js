import axios from 'axios';
import { useEffect, useState } from 'react';

const UseFetch = (url,head='') => {

    const [fethchData,setFatchdata] = useState(null);

    useEffect(()=>{
        axios.get(url,{headers:head})
        .then(res => setFatchdata(res.data))
    }
    ,[])
    
    return fethchData
};

export default UseFetch;