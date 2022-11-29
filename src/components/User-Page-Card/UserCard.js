import React, { useContext } from 'react';
import PrimaryButton from '../primary-button/PrimaryButton';
import {BiTime,BiWorld} from 'react-icons/bi';
import {GoLocation} from 'react-icons/go';
import { AuthUser } from '../../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const UserCard = ({data}) => {

    // use AuthContext For User Data
    const {logOut,currUserInfo} = useContext(AuthUser);

    // // api for all sellers information
    const url = `http://localhost:5000/wishlist?email=${currUserInfo?.userEmail}&id=${currUserInfo?._id}`;
    
     const {data:allWishlist,refetch} = useQuery({
            queryKey: ['all wishlist'],
            queryFn: async () => {
                try{
                const res = await axios.get(url,{headers:{authorization: `Bearer ${localStorage.getItem(`jwt-token`)}`}});  

                // const getWishlist = res?.data?.filter(elm => )
                }
                catch(e){
                    return e.request.status
                }
            }
    })

    // const {carInfo,location,paid,advertise,_id,postOwnerInfo,postedTime,resalePrice,sellCarImg} = data;

    // const shortlocation = location.roadNo+', '+location.area+', '+location.city+', '+location.country;
    
    // const bgImage = {
    //         backgroundImage: 
    //         `url(${sellCarImg})`,
    //         backgroundSize: 'cover',
    //         backgroundRepeat: 'no-repeat',
    // }

    if(currUserInfo?.userRole !== 'user') return <Navigate to={'/*'}></Navigate>;
    
    
    // return (
    //         <div className={`border drop-shadow-lg bg-whiteCard hover:scale-[1.02] duration-[500ms] rounded-t-md my-[3%]`}>
                
    //             {/* Card Content Middle */}
    //                 <div>
    //                 {/* Post Thumbnail */}
    //                 <div style={bgImage} className={`object-cover col-span-2 rounded-t-md h-[300px] max-h-fit`}>
    //                 </div>
    
    //                 <section className={`p-5`}>                    
    //                     {/* Time And Bookmark */}
    //                     <div className={`flex justify-between items-center`}>
    //                         <div className={`flex items-center p-1 lg:p-0`}>
    //                             <BiTime className={`text-2xl p-0.5 inline`}></BiTime>
    //                             <p>{postedTime}</p>
    //                         </div>
    //                     </div>
    
    //                     {/* Post Info */}
    //                     <div>
    //                         <h3 className={`text-2xl font-medium text-center my-1.5`}>{`${carInfo.brand} ${carInfo.sellCarModel} ${carInfo.carModelYear}`}</h3>
    //                         <p className={`text-center`}>this car sell for i am buy a new car..but i don't have much more money. if like this car then please knock me</p>
    //                     </div>
    
    //                     {/* Price */}
    //                     <div className={`flex text-center justify-center gap-x-4 items-center my-2`}>
    //                         <p className={`p-1 text-sm rounded-md bg-common hover:shadow-lg`}>Original price: ${carInfo.originalPrice}</p>
    //                         <p className={`p-1 text-sm rounded-md bg-primaryRed text-white hover:shadow-lg`}>Resale price: ${resalePrice}</p>
    //                     </div>
    
    //                     {/* Location */}
    //                     <div className={`hidden lg:flex capitalize gap-x-5 items-center justify-center`}>
    //                         <div className={`flex gap-x-2 items-center h-[60px]`}>
    //                             <GoLocation></GoLocation>
    //                             <p>{shortlocation}</p>
    //                         </div>
    //                         <div className={`flex gap-x-2 items-center`}>
    //                             <BiWorld></BiWorld>
    //                             <p>{location?.country}</p>
    //                         </div>
    //                     </div>
    //                     {/* Book Now Button */}
    //                     <div className={`flex gap-5`}>    
    //                         <PrimaryButton className={'w-full'}>DELETE</PrimaryButton>
    //                     </div>
    //                 </section>
    
    //             </div>
    //         </div>
    //     );
};

export default UserCard;