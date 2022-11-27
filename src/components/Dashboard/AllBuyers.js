import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import EmptyData from '../Empty-Data/EmptyData';
import ProfileCard from '../profile-card/ProfileCard';
import LoadingSpinner from '../Spinner/LoadingSpinner';

const AllBuyers = () => {

    // api for all sellers information
    const url = `http://localhost:5000/allUser`;

    const {data:allBuyers,refetch} = useQuery({
        queryKey: ['all seller'],
        queryFn: async () => {
            const res = await axios.get(url);
            const onlyBuyers = res.data.filter(elm => elm.userRole === 'user');
            return onlyBuyers
        }
    })

    console.log(allBuyers)

    async function handleSellerVerify (email,id,status) {
        // patch body for user verifiy
        const patchBody = {userEmail:email,_id:id,status}
        const res = await axios.patch(`http://localhost:5000/allUser`,patchBody);
        if(res.data.modifiedCount > 0){
            window.alert('Update Successful')
            refetch()
        }
    }

    async function handleDeleteSeller (id) {
        const res = await axios.delete(`http://localhost:5000/userInfo?id=${id}`);
        if(res.data.deletedCount > 0){
            window.alert('User Delete Successful')
            refetch()
        }
    }

    // waiting for user information
    if(!allBuyers) return <LoadingSpinner></LoadingSpinner>

    // if user information lengtn 0
    if(!allBuyers.length) return <EmptyData></EmptyData>

    return (
        <section className={`grid grid-cols-1 mx-[5%] sm:mx-[10%] md:grid-cols-2 lg:grid-cols-3 gap-7 md:mx-[5%] my-10`}>
            {
                allBuyers.map(elm => <ProfileCard handleDeleteSeller={handleDeleteSeller} handleSellerVerify={handleSellerVerify} key={elm._id} data={elm}></ProfileCard>)
            }
        </section>
    );
};

export default AllBuyers;