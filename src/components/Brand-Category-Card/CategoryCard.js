import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../primary-button/PrimaryButton';

const CategoryCard = ({data}) => {

    const navigate = useNavigate();

    const {brand,brandLogo,_id} = data;

    const handleNavigate = (categoryId) => navigate(`/category/${categoryId}`)

    return (
        <div className={`border bg-whiteCard drop-shadow-md rounded-lg w-[90%] lg:w-2/3 p-3 cursor-pointer mx-auto`}>
            <div>
                <img src={brandLogo} className={`mx-auto`} alt="Brand Logo" />
            </div>
            <div className={`text-center`}>
                <PrimaryButton onClick={()=>handleNavigate(_id)} className={'text-red-700'}>{brand}</PrimaryButton>
            </div>
        </div>
    );
};

export default CategoryCard;