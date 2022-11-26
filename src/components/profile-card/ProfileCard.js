import React, { useContext } from 'react';
import {GoUnverified,GoVerified} from 'react-icons/go';
import UseFetchIWithQuery from '../../Hook/UseFetchIWithQuery';
import PrimaryButton from '../primary-button/PrimaryButton';
import LoadingSpinner from '../Spinner/LoadingSpinner';

const ProfileCard = ({data}) => {

    const {userEmail,userAvatar,firstName,lastName,userContactNumber} = data;

    const soldUrl = `http://localhost:5000/userSoldCount?email=${userEmail}&paid=true`;

    const sellerPostUrl = `http://localhost:5000/userPostCount?email=${userEmail}`;

    const soldProd = UseFetchIWithQuery(soldUrl);

    const sellerAllPostCount = UseFetchIWithQuery(sellerPostUrl)

    return (
        <div className={`border rounded-md py-[5%]`}>
            {/* person image */}
            <div className={`rounded-[50%]`}>
                <img className={`rounded-[50%] border border-blackSA block mx-auto w-[100px] h-auto`} src={userAvatar} alt="User Avatar" />
            </div>

            {/* user Information */}
            <div>
                {/* user name */}
                <div className={`flex items-center my-3 gap-5 justify-center`}>
                    <p>{firstName.concat(' ',lastName)}</p>
                    <GoUnverified></GoUnverified>
                </div>

                {/* user contact information */}
                <div className={`text-center my-3`}>
                    <p className={`font-light`}>{userEmail}</p>
                    <p className={`font-light italic`}>{userContactNumber}</p>
                </div>

                {/* Activity Box */}
                <div className={`grid grid-cols-3 px-2 my-5  gap-2 text-center`}>
                    <div className={`p-3 border rounded-lg`}>
                        {
                            !sellerAllPostCount ? <LoadingSpinner></LoadingSpinner>
                            : <h5>{sellerAllPostCount.length}</h5>
                        }
                        <h6>POST</h6>
                    </div>
                    <div className={`p-3 border rounded-lg`}>
                        {
                            !soldProd ? <LoadingSpinner></LoadingSpinner>
                            : <h5>{soldProd.length}</h5>
                        }
                        <h6>Sell</h6>
                    </div>
                    <div className={`p-3 border rounded-lg`}>
                        <h5>2/10</h5>
                        <h6>rate</h6>
                    </div>
                </div>

                {/* Button */}
                <div className={`flex gap-2 justify-center mt-5`}>
                    <PrimaryButton className={`px-3 py-1.5`}>Verify</PrimaryButton>
                    <PrimaryButton className={`px-3 py-1.5 bg-red-600`}>Delete</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;