import React from 'react';
import carImages from '../../images/BMW.jpg';

const Carousel = () => {
    return (
        <>
            <div className={`w-1/2 mx-auto`}>
                <img className={`rounded-lg`} src={carImages} alt="Banner" />
            </div>
        </>
    );
};

export default Carousel;