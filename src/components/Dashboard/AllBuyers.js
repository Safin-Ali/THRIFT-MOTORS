import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UnAuthorized from '../404-Not-Found/UnAuthorized';
import EmptyData from '../Empty-Data/EmptyData';
import ProfileCard from '../profile-card/ProfileCard';
import LoadingSpinner from '../Spinner/LoadingSpinner';

const AllBuyers = () => {

    // api for all sellers information
    const url = `http://localhost:5000/allUser`;

    const navigate = useNavigate();

    const {data:allBuyers,refetch} = useQuery({
        queryKey: ['all seller'],
        queryFn: async () => {
            try{
            const res = await axios.get(url,{headers:{authorization: `Bearer ${localStorage.getItem(`jwt-token`)}`}});
            const onlyBuyers = res.data.filter(elm => elm.userRole === 'user');
            return onlyBuyers
            }
            catch(e){
                return e.request.status
            }
        }
    })

    async function handleSellerVerify (email,id,status) {
        try{
            // patch body for user verifiy
            const patchBody = {userEmail:email,_id:id,status}
            const res = await axios.patch(`http://localhost:5000/allUser`,patchBody,{headers:{authorization: `Bearer ${localStorage.getItem(`jwt-token`)}`}});
            if(res.data.modifiedCount > 0){
                window.alert('Update Successful')
                refetch()
            }
        }
        catch(e){
            console.log(e.message)
            if(e.request.status === 401) return navigate('/error401')
            return
        }
        
    }

    async function handleDeleteSeller (id) {
        try{
            const res = await axios.delete(`http://localhost:5000/userInfo?id=${id}`,{headers:{authorization: `Bearer ${localStorage.getItem(`jwt-token`)}`}});
            if(res.data.deletedCount > 0){
                window.alert('User Delete Successful')
                refetch()
            }
        }
        catch(e){
            console.log(e.message)
            if(e.request.status === 401) return navigate('/error401')
            return
        }
    }

    // when jwt key do not decrypt
    if(allBuyers === 401) return <UnAuthorized></UnAuthorized>

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