import React, { useState } from 'react';
import {useLoaderData } from 'react-router-dom';
import BookProductModal from '../../components/Form/BookProductModal';
import LeftSideNav from '../../components/Navbar/LeftSideNav';
import RightSideNav from '../../components/Navbar/RightSideNav';
import PostCard from '../../components/post-card/PostCard';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';

const PostData = () => {

    // get this params category all data
    const fetcheData = useLoaderData();

    // toggle modal
    const[toggle,setToggle] = useState(false);

    // modal default data set
    const[modalDT,setModalDT] = useState([]);

    // wait for response
    if(!fetcheData) return <LoadingSpinner></LoadingSpinner>


    return (
        <section>
            <div className={`grid grid-cols-4 gap-[5%]`}>
                
                <div className={`border`}>
                        <LeftSideNav></LeftSideNav>
                </div>

                <div className={`col-span-2 py-[3%]`}>
                {
                        !fetcheData.length ? <p>No Post Found</p> : 
                        fetcheData.map(data => <PostCard setModalDT={setModalDT} toggle={toggle} setToggle={setToggle} key={data._id} data={data}></PostCard>)
                }
                </div>

                <div className={`border`}>
                        <RightSideNav></RightSideNav>
                </div>

            </div>
            <BookProductModal modalDT={modalDT} toggle={toggle} setToggle={setToggle}></BookProductModal>
        </section>
    );
};

export default PostData;