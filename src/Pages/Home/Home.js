import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import CategoryCard from '../../components/Brand-Category-Card/CategoryCard';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';

const Home = () => {

    const {data: allBrands} = useQuery({
        queryKey: ['allBrand'],
        queryFn: () => axios.get(`http://localhost:5000/all-brand`)
        .then(res => res.data)
    })

    return (
        <>
            <header className={`py-10 mx-[4%]`}>

                {/* Carousel Banner */}
                <div>
                    <Carousel></Carousel>
                </div>

                {/* Category / Brand Logo */}

                {
                    !allBrands ? <LoadingSpinner></LoadingSpinner>
                    :
                    <div className="grid grid-cols-3 gap-[5%] my-[5%] justify-center">
                        {
                                        allBrands?.map(brand => <CategoryCard key={brand._id} data={brand}></CategoryCard>)
                        }
                    </div>
                }

            </header>
        </>
    );
};

export default Home;