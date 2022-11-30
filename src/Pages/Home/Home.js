import React, {useContext, useEffect, useState } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import CategoryCard from '../../components/Brand-Category-Card/CategoryCard';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import Footer from '../../components/footer/Footer';
import AdvertisedProduct from '../../components/advertised-product/AdvertisedProduct';
import { ToastContainer} from 'react-toastify';
import BookProductModal from '../../components/Form/BookProductModal';
import { AuthUser } from '../../Context/AuthContext';
import { useCurrUserInfo } from '../../Hook/useCurrUserInfo';
import ExtraServiceCard from '../../components/extra-service-card/ExtraServiceCard';

const Home = () => {

    const {notifySuccess,notifyFaild} = useContext(AuthUser)

    const currUserInfo = useCurrUserInfo();

    const bgImage = {
        backgroundImage: 
        `url(https://i.ibb.co/L13jN5q/buying-car-winning-money-vector-illustration-82574-4840.jpg)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }

    // store advertised post data
    const[advPost,setAdvertisedPost] = useState([]);

    // get all brand data
    const {data: allBrands} = useQuery({
        queryKey: ['allBrand'],
        queryFn: () => axios.get(`https://thrift-motors-server.vercel.app/all-brand`)
        .then(res =>res.data)
    });

    // toggle modal
    const[toggle,setToggle] = useState(false);

    const handleBooked = async ({contactNumber,location}) => {

        // Data Algorithm for booked Information
        const data = {contactNumber,location,bookedProductId:modalDT._id,price: modalDT.resalePrice,productImg:modalDT.sellCarImg,buyerEmail: currUserInfo.userEmail};

        try{
            const res = await axios.post(`https://thrift-motors-server.vercel.app/bookedCar`,data,{headers:{authorization: `Bearer ${localStorage.getItem(`jwt-token`)}`}});
            if(res.data.acknowledged) {
                notifySuccess('Booking Successfull')
                return setToggle(!toggle)
            }
        }
        catch(e){
            notifyFaild(e.message)
        }
    }

    // modal default data set
    const[modalDT,setModalDT] = useState([]);

    // get all advertised data
    useEffect(()=>{
        axios.get(`https://thrift-motors-server.vercel.app/advertised`,{headers:{authorization: `Bearer ${localStorage.getItem(`jwt-token`)}`}})
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
                        <Carousel className={'w-full lg:w-[75%]'} url={`https://thrift-motors-server.vercel.app/sliderImage`}></Carousel>
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

                {/* Extra Services Ffeatures */}
                <section className={`md:mx-[4%] my-5 pb-[2%]`}>
                <h3 className={`text-3xl font-bold text-center mt-[5%] pb-3 capitalize`}>Our Extra Services</h3>
                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-0 md:grid-cols-3`}>
                        <ExtraServiceCard imgLink={`https://i.ibb.co/9rsPfYN/auto-mechanic-repairing-vehicle-engine-isolated-flat-vector-illustration-cartoon-man-fixing-checking.png`}>
                        <h3 className={`text-xl font-bold text-center text-primaryRed mt-[5%] pb-3 capitalize`}>Our CAR REPAIR</h3>
                        <p className={`font-medium text-center px-3`}>If you have car problems anywhere in any country. You can email us. Our team will try to repair your car.</p>                            
                        </ExtraServiceCard>
                        <ExtraServiceCard imgLink={`https://i.ibb.co/DMNS8R6/Car-finance-pana.png`}>
                        <h3 className={`text-xl font-bold text-center text-primaryRed mt-[5%] pb-3 capitalize`}>BUY CAR WITH LOAN</h3>                            
                            <p className={`font-medium text-center px-3`}>You can buy a used car through loan from us if you want. But in that case some instructions must be followed.</p>  
                        </ExtraServiceCard>
                        <ExtraServiceCard imgLink={`https://i.ibb.co/RcJDcsC/QA-engineers-bro.png`}>
                        <h3 className={`text-xl font-bold text-center text-primaryRed mt-[5%] pb-3 capitalize`}>1 YEAR GUARANTEE</h3>
                        <p className={`font-medium text-center px-3`}>Our most attractive feature here is that we offer 1 or more than year warranty on used cars</p>                        
                        </ExtraServiceCard>
                    </div>
                </section>

            <Footer></Footer>
            <section className={`relative`}>
                    <div className={`${toggle ? 'opacity-100' : 'opacity-0'} transition delay-[500ms] ease-linear`}><BookProductModal handleBooked={handleBooked} modalDT={modalDT} toggle={toggle} setToggle={setToggle}></BookProductModal></div>
                
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