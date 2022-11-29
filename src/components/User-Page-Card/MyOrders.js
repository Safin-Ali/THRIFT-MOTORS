import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthUser } from '../../Context/AuthContext';
import UnAuthorized from '../404-Not-Found/UnAuthorized';
import LoadingSpinner from '../Spinner/LoadingSpinner';
import EmptyData from '../Empty-Data/EmptyData';
import BookedCard from '../booked-product-card/BookedCard';


const MyOrders = () => {

    const {currUserInfo} = useContext(AuthUser)
    
    const {data:bookedCar,refetch} = useQuery({
        queryKey: ['all seller',currUserInfo?.userEmail],
        queryFn: async () => {
            try{
            const res = await axios.get(`http://localhost:5000/bookedCar?email=${currUserInfo?.userEmail}`,{headers:{authorization: `Bearer ${localStorage.getItem(`jwt-token`)}`}});
            return res.data;
            }
            catch(e){
                return e.request.status
            }
        }
    })

    // when jwt key do not decrypt
    if(bookedCar === 401) return <UnAuthorized></UnAuthorized>;

    // waiting for user information
    if(!bookedCar) return <LoadingSpinner></LoadingSpinner>;
    
    // if user information lengtn 0
    if(!bookedCar.length) return <EmptyData></EmptyData>;

    console.log(bookedCar)

    return (
        <>
        <h2 className={`mx-[5%] text-center text-3xl font-semibold sm:mx-[10%] md:mx-[5%] md:text-left my-5`}>My Order</h2>
        <section className={`grid grid-cols-1 mx-[5%] sm:mx-[10%] md:grid-cols-2 lg:grid-cols-3 gap-7 md:mx-[5%] my-10`}>
            {
                bookedCar.map(elm => <BookedCard key={elm._id} data={elm}></BookedCard>)
            }
        </section>
        </>
    );
};

export default MyOrders;