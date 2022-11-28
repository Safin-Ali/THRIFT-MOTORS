import React, { useContext, useState } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import {useLoaderData, useNavigate } from 'react-router-dom';
import EmptyData from '../../components/Empty-Data/EmptyData';
import BookProductModal from '../../components/Form/BookProductModal';
import LeftSideNav from '../../components/Navbar/LeftSideNav';
import PostCard from '../../components/post-card/PostCard';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import { ToastContainer} from 'react-toastify';
import { AuthUser } from '../../Context/AuthContext';
import axios from 'axios';

const PostData = () => {

    const {currUserInfo,notifySuccess} = useContext(AuthUser);

    // get this params category all data
    let fetcheData = useLoaderData();

    // assign new route / change route path using by this hook
    const navigate = useNavigate();

    // wishlist product function
    function wishListProd (serviceId) {
        axios.post('http://localhost:5000/wishlist',{email:currUserInfo?.userEmail,userId:currUserInfo?._id,productId:serviceId},{headers:{authorization: `Bearer ${localStorage.getItem(`jwt-token`)}`}})
        .then(res => {
            if(res.data.acknowledged){
                notifySuccess('WOW! You Are Booked Successfully')
            }
        })
        .catch(e => {
            console.log(e.request)
            if(e.request.status === 401) return navigate('/login')
        })
    }

    // toggle modal
    const[toggle,setToggle] = useState(false);

    // modal default data set
    const[modalDT,setModalDT] = useState([]);

    // side nav toggle
    const[togSideNav,setBolNavTog] = useState(false);

    // wait for response
    if(!fetcheData) return <LoadingSpinner></LoadingSpinner>;

    return (
        <section>
            <div className={`flex md:grid mx-auto sm:grid-cols-3 lg:grid-cols-4 lg:gap-5`}>
                
                <aside className={`border overflow-hidden ${togSideNav ? 'basis-full' : 'basis-0'}`}>
                        <LeftSideNav></LeftSideNav>
                </aside>

                <aside className={`md:grid-cols-1 md:col-span-2 lg:col-span-3 py-[3%]`}>
                    <div>
                    {
                            !fetcheData.length ?  <EmptyData></EmptyData>: 
                            fetcheData.map(data => <PostCard wishListProd={wishListProd} setModalDT={setModalDT} toggle={toggle} setToggle={setToggle} key={data._id} data={data}></PostCard>)
                    }
                    </div>
                </aside>

            </div>
                    
            <section className={`relative`}>
                    <div className={`${toggle ? 'opacity-100' : 'opacity-0'} transition delay-[500ms] ease-linear`}><BookProductModal modalDT={modalDT} toggle={toggle} setToggle={setToggle}></BookProductModal></div>
                {/* side nav arrow */}
                <div className={`fixed top-1/2 cursor-pointer md:hidden`}><FaArrowAltCircleRight onClick={()=>setBolNavTog(!togSideNav)} className={`text-xl`}></FaArrowAltCircleRight></div>
                
            </section>
            <ToastContainer
            position="top-center"
            autoClose={2000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"/>
        </section>
    );
};

export default PostData;