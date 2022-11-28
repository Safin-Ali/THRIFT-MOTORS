import React, {useEffect, useState } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import CategoryCard from '../../components/Brand-Category-Card/CategoryCard';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import Footer from '../../components/footer/Footer';
import AdvertisedProduct from '../../components/advertised-product/AdvertisedProduct';
import { ToastContainer} from 'react-toastify';
import BookProductModal from '../../components/Form/BookProductModal';

const Home = () => {

    // store advertised post data
    const[advPost,setAdvertisedPost] = useState([]);

    // get all brand data
    const {data: allBrands} = useQuery({
        queryKey: ['allBrand'],
        queryFn: () => axios.get(`http://localhost:5000/all-brand`)
        .then(res =>res.data)
    });

    // toggle modal
    const[toggle,setToggle] = useState(false);

    // modal default data set
    const[modalDT,setModalDT] = useState([]);

    // get all advertised data
    useEffect(()=>{
        axios.get(`http://localhost:5000/advertised`,{headers:{authorization: `Bearer ${localStorage.getItem(`jwt-token`)}`}})
        .then(res => setAdvertisedPost(res.data))
    },[])

    return (
        <>
            <header className={`py-10 mx-[4%]`}>

                {/* Carousel Banner */}
                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-5 justify-center items-center`}>
                    <div className={`text-center`}>
                        <h1 className={`text-2xl font-semibold mb-5`}>Welcome, <span className={`text-common`}>THRIFT</span> <span className={`text-primaryRed`}>MOTORS</span></h1>
                        <p className={`text-lg`}>Here you bought all secondhand or used car with good condition.</p>
                    </div>
                    <div className={`lg:col-span-2`}>
                        <Carousel className={'w-full lg:w-[75%]'} url={`http://localhost:5000/sliderImage`}></Carousel>
                    </div>
                </div>

                {/* Category / Brand Logo */}

                    <h3 className={`text-3xl font-bold text-center mt-[5%] capitalize`}>Choose Your Brand</h3>
                {
                    !allBrands ? <LoadingSpinner></LoadingSpinner>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-[3%] justify-center">
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
                        <h3 className={`text-3xl font-bold text-center mt-[5%] pb-3 capitalize`}>Advertised post</h3>
                        <div className={`lg:grid-cols-3 grid-cols-1 md:grid-cols-2 grid w-[90%] mx-auto gap-6 justify-center`}>
                            {
                                advPost.map(post =>  <AdvertisedProduct setModalDT={setModalDT} key={post._id} toggle={toggle} setToggle={setToggle} data={post}></AdvertisedProduct>)
                            }
                        </div>
                    </section>
                }

                <div>
                </div>
            </header>
            <Footer></Footer>
            <section className={`relative`}>
                    <div className={`${toggle ? 'opacity-100' : 'opacity-0'} transition delay-[500ms] ease-linear`}><BookProductModal modalDT={modalDT} toggle={toggle} setToggle={setToggle}></BookProductModal></div>
                
            </section>
            <ToastContainer
            position="top-center"
            autoClose={2000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"/>
        </>
    );
};

export default Home;