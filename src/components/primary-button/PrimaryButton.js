import React from 'react';

const PrimaryButton = ({children,className='',onClick=null}) => {
    return (
        <button type={'submit'}  onClick={onClick} className={`bg-common my-3 px-2 py-1.5 rounded-md text-white hover:bg-commonDeep ${className}`}>{children}</button>
    );
};

export default PrimaryButton;