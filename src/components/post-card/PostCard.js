import React from 'react';
import PrimaryButton from '../primary-button/PrimaryButton';
import {GoUnverified,GoVerified} from 'react-icons/go'

const PostCard = ({data}) => {

    console.log(data)

    const {carInfo,location,paid,postOwnerInfo,postedTime,resalePrice,sellCarImg,serviceId,usedTime} = data;

    const shortlocation = location.roadNo+', '+location.area+', '+location.city+', '+location.country;

    return (
        <div className={`border shadow-md rounded-t-lg my-[3%]`}>
            
            {/* Card Content Middle */}
            <div>

                {/* Post Thumbnail */}
                <div>
                    <img src={sellCarImg} className={`border rounded-t-lg`} alt="Post Thumbnail" />
                </div>

                <div className={`flex justify-end mr-[2%] my-[5%]`}><GoVerified className={`text-2xl`}></GoVerified></div>

                <section className={`p-10`}>
                    {/* Post Info */}
                    <div>
                        <h3 className={`text-2xl font-medium text-center my-1.5`}>{`${carInfo.brand} ${carInfo.sellCarModel} ${carInfo.carModelYear}`}</h3>
                        <p className={`text-center`}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>

                    {/* Price */}
                    <div className={`flex justify-between items-center my-2`}>
                        <p className={`p-2 rounded-md bg-common hover:shadow-lg`}>Original price: ${carInfo.originalPrice}</p>
                        <p className={`p-2 rounded-md bg-primaryRed text-white hover:shadow-lg`}>Resale price: ${resalePrice}</p>
                    </div>

                    {/* Time And Location */}
                    <div className={`flex capitalize justify-between my-2`}>
                        <p>{shortlocation}</p>
                        <p>{postedTime}</p>
                    </div>

                    {/* Post owner Info */}
                    <div className={`flex justify-between items-center`}>
                        <div className={`w-[10%] rounded-[50%]`}>
                            <img className={`rounded-[50%]`} src={postOwnerInfo.photo} alt="Pisr Author Avatar" />
                        </div>
                        <div className={`flex flex-col justify-center`}>
                            <p>{postOwnerInfo.email}</p>
                            <p>{postOwnerInfo.phoneNumber}</p>
                        </div>
                    </div>

                    {/* Book Now Button */}
                    <div>
                        <PrimaryButton className={'w-full'}>Book Now</PrimaryButton>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default PostCard;