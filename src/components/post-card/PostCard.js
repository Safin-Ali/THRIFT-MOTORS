import React from 'react';
import PrimaryButton from '../primary-button/PrimaryButton';
import {GoUnverified,GoVerified} from 'react-icons/go';
import {MdReportGmailerrorred} from 'react-icons/md';
import {BiTime,BiWorld} from 'react-icons/bi';
import {GoLocation} from 'react-icons/go';

const PostCard = ({data,setToggle,toggle,setModalDT,reportProduct}) => {

    const {carInfo,location,postOwnerInfo,postedTime,resalePrice,sellCarImg,_id} = data;

    const shortlocation = location.roadNo+', '+location.area+', '+location.city;

    const bgImage = {
        backgroundImage: 
        `url(${sellCarImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }

    return (
        <div className={`border mx-[3%] sm:mx-[10%] pb-3 lg:pb-0 shadow-md bg-whiteCard rounded-t-md lg:rounded-l-md my-[3%] lg:mr-[5%] lg:mx-0`}>
            
            {/* Card Content Middle */}
            <div className={`grid grid-cols-1 lg:grid-cols-5 justify-center items-center`}>

                {/* Post Thumbnail */}
                <div style={bgImage} className={`object-cover col-span-2 rounded-t-md lg:rounded-r-none lg:rounded-l-md h-[350px] max-h-fit`}>

                </div>

                <section className={` px-3 lg:col-span-3`}>

                    {/* Time And Bookmark */}
                    <div className={`flex justify-between items-center`}>
                        <div className={`flex items-center p-1 lg:p-0`}>
                            <BiTime className={`text-2xl p-0.5 inline`}></BiTime>
                            <p>{postedTime}</p>
                        </div>
                        <MdReportGmailerrorred onClick={()=>reportProduct(_id)} className={`text-4xl p-1 text-red-600 cursor-pointer`}></MdReportGmailerrorred>
                    </div>

                    {/* Post Info */}
                    <div>
                        <h3 className={`text-2xl font-medium text-center my-1.5`}>{`${carInfo.brand} ${carInfo.sellCarModel} ${carInfo.carModelYear}`}</h3>
                        <p className={`text-center capitalize`}>this car sell for i am buy a new car..but i don't have much more money. if like this car then please knock me</p>
                    </div>

                    {/* Price */}
                    <ul className={`flex text-center font-medium justify-center gap-x-4 items-center my-2`}>
                        <li>Original ${carInfo.originalPrice}</li>
                        <li>Resale ${resalePrice}</li>
                    </ul>

                    {/* Location */}
                    <div className={`flex capitalize gap-x-5 items-center justify-center`}>
                        <div className={`flex gap-x-2 items-center`}>
                            <GoLocation></GoLocation>
                            <p>{shortlocation}</p>
                        </div>
                        <div className={`flex gap-x-2 items-center`}>
                            <BiWorld></BiWorld>
                            <p>{location?.country}</p>
                        </div>
                    </div>

                    {/* Book Now Button */}
                    <div className={`text-center`}>
                        <PrimaryButton onClick={()=>{
                            setModalDT(data)
                            setToggle(!toggle)
                            }} className={''}>Book Now 
                            {postOwnerInfo.varified ?
                                <GoVerified className={`text-green-700 ml-2 inline-block`}></GoVerified>
                                : <GoUnverified className={`ml-2 inline-block`}></GoUnverified>}</PrimaryButton>
                    </div>

                    {/* Post owner Info */}
                    <div className={`flex justify-center border-t py-1 gap-x-4 items-center`}>
                        <div className={`w-[10%] rounded-[50%]`}>
                            <img className={`rounded-[50%]`} src={postOwnerInfo.photo} alt="Pisr Author Avatar" />
                        </div>
                        <div className={`flex flex-col justify-center`}>
                            <div className={`flex items-center justify-center gap-x-2`}>
                            <p>{postOwnerInfo.name}</p>
                                {
                                    postOwnerInfo.varified ?
                                    <GoVerified className={`text-blue-600`}></GoVerified>
                                    : <GoUnverified></GoUnverified>
                                }
                            </div>
                            <p>{postOwnerInfo.email}</p>
                            <p>{postOwnerInfo.phoneNumber}</p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default PostCard;