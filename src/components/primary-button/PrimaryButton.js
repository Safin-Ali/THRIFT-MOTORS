import React from 'react';

const PrimaryButton = ({children, disabled= false,className='',onClick=null}) => {
    return (
        <button onClick={onClick} className={`bg-common my-3 px-2 py-1.5 rounded-md text-white hover:bg-commonDeep ${className}`} disabled={disabled}>{children}</button>
    );
};

export default PrimaryButton;