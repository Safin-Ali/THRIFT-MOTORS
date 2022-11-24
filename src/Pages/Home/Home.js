import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const Home = () => {

    const {data: allBrand} = useQuery({
        queryKey: ['allBrand'],
        queryFn: () => axios.get(`http://localhost:5000/all-brand`)
        .then(res => res.data)
    })

    return (
        <>
            <header className={`py-10`}>
                {/* Carousel Banner */}
                <div>
                    <Carousel></Carousel>
                </div>
            </header>
        </>
    );
};

export default Home;