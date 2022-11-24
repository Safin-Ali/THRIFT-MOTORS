import React from 'react';

const PrimaryButton = ({children,onClick=''}) => {
    return (
        <button  onClick={onClick} className={'bg-common my-3 px-2 py-1.5 rounded-md text-white hover:bg-commonDeep'}>{children}</button>
    );
};

export default PrimaryButton;