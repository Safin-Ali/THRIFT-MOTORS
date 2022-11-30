import React from 'react';

const ExtraServiceCard = ({imgLink='',children,parentClassName='',}) => {
    return (
        <div className={`${parentClassName} hover:scale-[1.03] duration-[300ms] bg-whiteCard border py-3 mx-auto shadow-md w-[90%] md:w-[70%] rounded-lg`}>
            <div className={`w-[80%] md:w-[60%] mx-auto min-h-[170px] md:max-h-[170px]`}>
                <img src={imgLink} alt="Service_Vector" />
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default ExtraServiceCard;