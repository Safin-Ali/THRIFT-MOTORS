import axios from 'axios';
import { useEffect, useState } from 'react';

const UseFetch = (url) => {

    const [fethchData,setFatchdata] = useState(null);

    useEffect(()=>{
        axios.get(url)
        .then(res => setFatchdata(res.data))
    }
    ,[])
    
    return fethchData
};

export default UseFetch;