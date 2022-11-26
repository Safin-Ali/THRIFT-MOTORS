import React, { useEffect, useState } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import CategoryCard from '../../components/Brand-Category-Card/CategoryCard';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import Footer from '../../components/footer/Footer';

const Home = () => {

    // store advertised post data
    const[advPost,setAdvertisedPost] = useState([]);

    // get all brand data
    const {data: allBrands} = useQuery({
        queryKey: ['allBrand'],
        queryFn: () => axios.get(`http://localhost:5000/all-brand`)
        .then(res =>res.data)
    })

    // get all advertised data
    useEffect(()=>{
        axios.get(`http://localhost:5000/advertised`)
        .then(res => setAdvertisedPost(res.data))
    },[])

    return (
        <>
            <header className={`py-10 mx-[4%]`}>

                {/* Carousel Banner */}
                <div>
                    <Carousel url={`http://localhost:5000/sliderImage`}></Carousel>
                </div>

                {/* Category / Brand Logo */}

                {
                    !allBrands ? <LoadingSpinner></LoadingSpinner>
                    :
                    <div className="grid grid-cols-3 gap-10 my-[5%] justify-center">
                        {
                            allBrands?.slice(0,3).map(brand => <CategoryCard key={brand._id} data={brand}></CategoryCard>)
                        }
                    </div>
                }

                {/* advertised post */}

                {
                    advPost.length > 0 
                    &&
                    <section>
                        <h2>Advertised post</h2>
                        <div>
                            {
                                advPost.map(post => <div key={post._id}><img src={post.sellCarImg} alt="Post Banner" /></div>)
                            }
                        </div>
                    </section>
                }

            </header>
            <Footer></Footer>
        </>
    );
};

export default Home;