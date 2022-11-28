import React, { useContext } from 'react';
import PrimaryButton from '../primary-button/PrimaryButton';
import {BiTime,BiWorld} from 'react-icons/bi';
import {GoLocation} from 'react-icons/go';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthUser } from '../../Context/AuthContext';
import UserCard from '../User-Page-Card/UserCard';
import UseFetch from '../../Hook/UseFetch';

const MyWishlist = ({data}) => {

    // use AuthContext For User Data
    const {currUserInfo} = useContext(AuthUser);
    
    // api for all sellers information
    const url = `http://localhost:5000/wishlist?email=${currUserInfo?.userEmail}&id=${currUserInfo?._id}`;
    
     const {data:allPostlist,refetch} = useQuery({
            queryKey: ['all post'],
            queryFn: async () => {
                try{

                const res = await axios.get(url,{headers:{authorization: `Bearer ${localStorage.getItem(`jwt-token`)}`}});

                return res.data
                }

                catch(e){
                    return e.request.status
                }
            }
    })

    // return(
    //     <section className={`grid grid-cols-1 mx-[5%] sm:mx-[10%] md:grid-cols-2 lg:grid-cols-3 gap-7 md:mx-[5%] my-10`}>
    //     {
    //         allPostlist?.map(elm => <UserCard  key={elm._id} data={elm}></UserCard>)
    //     }
    // </section>
    // )
};

export default MyWishlist;