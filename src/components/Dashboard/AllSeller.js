import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthUser } from '../../Context/AuthContext';
import EmptyData from '../Empty-Data/EmptyData';
import ProfileCard from '../profile-card/ProfileCard';
import LoadingSpinner from '../Spinner/LoadingSpinner';

const AllSeller = () => {

    // use AuthContext For User Data
    const {deleteAccount} = useContext(AuthUser);

    // api for all sellers information
    const url = `http://localhost:5000/allUser`

    const {data:allSellers,refetch} = useQuery({
        queryKey: ['all seller'],
        queryFn: async () => {
            const res = await axios.get(url);
            const onlySellers = res.data.filter(elm => elm.userRole === 'seller')
            return onlySellers
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
        try{
            const res = await axios.delete(`http://localhost:5000/userInfo?id=${id}`);
            if(res.data.deletedCount > 0){
                const del = await deleteAccount();
                await window.alert('User Delete Successful')
                await refetch()
            }
        }
        catch(e){
            console.log(e)
        }
    }

    // waiting for user information
    if(!allSellers) return <LoadingSpinner></LoadingSpinner>

    // if user information lengtn 0
    if(!allSellers.length) return <EmptyData></EmptyData>

    return (
        <section className={`grid grid-cols-1 mx-[5%] sm:mx-[10%] md:grid-cols-2 lg:grid-cols-3 gap-7 md:mx-[5%] my-10`}>
            {
                allSellers.map(elm => <ProfileCard handleDeleteSeller={handleDeleteSeller} handleSellerVerify={handleSellerVerify} key={elm._id} data={elm}></ProfileCard>)
            }
        </section>
    );
};

export default AllSeller;