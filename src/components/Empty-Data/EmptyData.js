import React from 'react';

const EmptyData = ({className=''}) => {
    return (
        <section className={`flex items-center max-h-full`}>
            <div className={`w-4/5 mx-auto`}>
                <img className={`mx-auto block`} src="https://i.ibb.co/4sp0zcd/2202-w046-n004-46b-p1-46-removebg-preview.png" alt="No Data Found" />
            </div>
        </section>
    );
};

export default EmptyData;