import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import EmptyData from '../Empty-Data/EmptyData';
import ProfileCard from '../profile-card/ProfileCard';
import LoadingSpinner from '../Spinner/LoadingSpinner';

const AllUser = () => {

    // api for all sellers information
    const url = `http://localhost:5000/allUser?role=seller`

    const {data:allSellers,refetch} = useQuery({
        queryKey: ['all seller'],
        queryFn: async () => {
            const res = await axios.get(url);
            return res.data
        }
    })

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
    if(!allSellers) return <LoadingSpinner></LoadingSpinner>

    // if user information lengtn 0
    if(!allSellers.length) return <EmptyData></EmptyData>

    return (
        <section className={`grid grid-cols-1 sm:mx-[20%] md:grid-cols-2 lg:grid-cols-3 gap-7 md:mx-[8%] my-10`}>
            {
                allSellers.map(elm => <ProfileCard handleDeleteSeller={handleDeleteSeller} handleSellerVerify={handleSellerVerify} key={elm._id} data={elm}></ProfileCard>)
            }
        </section>
    );
};

export default AllUser;