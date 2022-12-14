import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthUser } from '../../Context/AuthContext';
import UnAuthorized from '../404-Not-Found/UnAuthorized';
import EmptyData from '../Empty-Data/EmptyData';
import ReportedProductCard from '../reported-product-card/ReportedProductCard';
import LoadingSpinner from '../Spinner/LoadingSpinner';

const AllReportedPost = () => {

    // use AuthContext For User Data
    const {notifySuccess} = useContext(AuthUser);

    const navigate = useNavigate();

    // api for all sellers information
    const url = `https://thrift-motors-server.vercel.app/reportedProd`

    const {data:allReportedPost,refetch} = useQuery({
        queryKey: ['all reported'],
        queryFn: async () => {
            try{
                const res = await axios.get(url,{headers:{authorization: `Bearer ${localStorage.getItem(`jwt-token`)}`}});
                return res.data
            }
            catch(e){
                return e.request.status
            }
        }
    })

    async function handleDeletePost (id,email) {
        try{
            // patch body for user verifiy
            const res = await axios.delete(`https://thrift-motors-server.vercel.app/postedData?id=${id}&email=${email}`,{headers:{authorization: `Bearer ${localStorage.getItem(`jwt-token`)}`}});
            if(res.data.deletedCount > 0){
                notifySuccess('Post Deleted')
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
    if(allReportedPost === 401) return <UnAuthorized></UnAuthorized>

    // waiting for user information
    if(!allReportedPost) return <LoadingSpinner></LoadingSpinner>

    // if user information lengtn 0
    if(!allReportedPost.length) return <EmptyData></EmptyData>

    return (
        <section className={`grid grid-cols-1 mx-[5%] sm:mx-[10%] md:grid-cols-2 lg:grid-cols-3 gap-7 md:mx-[5%] my-10`}>
            {
                allReportedPost.map(elm => <ReportedProductCard handleDeletePost={handleDeletePost} key={elm._id} data={elm}></ReportedProductCard>)
            }
        </section>
    );
};

export default AllReportedPost;