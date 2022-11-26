import React from 'react';
import UseFetch from '../../Hook/UseFetch';
import UseFetchIWithQuery from '../../Hook/UseFetchIWithQuery';
import ProfileCard from '../profile-card/ProfileCard';
import LoadingSpinner from '../Spinner/LoadingSpinner';

const AllUser = () => {

    // api for all sellers information
    const url = `http://localhost:5000/allUser?role=seller`

    // get all seller
    const data = UseFetchIWithQuery(url)

    // waiting for user information
    if(!data) return <LoadingSpinner></LoadingSpinner>

    // if user information lengtn 0
    if(!data.length) return <p>0 data</p>

    return (
        <section className={`grid grid-cols-3 gap-7 mx-[8%] my-10`}>
            {
                data.map(elm => <ProfileCard key={elm._id} data={elm}></ProfileCard>)
            }
        </section>
    );
};

export default AllUser;