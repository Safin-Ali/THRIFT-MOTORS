import React from 'react';
import PrimaryButton from '../primary-button/PrimaryButton';
const BookedCard = ({data}) => {
    
    const {carInfo,paid,resalePrice,sellCarImg} = data;

    const bgImage = {
        backgroundImage: 
        `url(${sellCarImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }

    return (
        <>
            <div className={`border shadow-md duration-[700] rounded-t-xl rounded-b-md`}>
                <div style={bgImage} className={`object-cover rounded-t-xl h-[270px]`}>
                </div>
                <div className={`p-3`}>

                <h3 className={`text-2xl font-semibold text-center my-1.5 md:min-h-[70px]`}>{`${carInfo.brand} ${carInfo.sellCarModel} ${carInfo.carModelYear}`}</h3>

                    <div className={`flex justify-center items-center text-center gap-x-3`}>
                        <p className={`font-medium rounded-xl border p-1.5 bg-whiteCard drop-shadow-sm`}>Resale <b>${resalePrice}</b></p>
                        <p className={`font-medium rounded-xl border p-1.5 bg-whiteCard drop-shadow-sm`}><b>{paid?'Sold':'Available'}</b></p>
                    </div>

                    <div className={`text-center`}>
                        <PrimaryButton className={`hover:scale-[1.05] duration-[500ms]`}>PAY NOW</PrimaryButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookedCard;