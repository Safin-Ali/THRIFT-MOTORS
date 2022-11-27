import React, { useState } from 'react';
import {useLoaderData } from 'react-router-dom';
import EmptyData from '../../components/Empty-Data/EmptyData';
import BookProductModal from '../../components/Form/BookProductModal';
import LeftSideNav from '../../components/Navbar/LeftSideNav';
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
            <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-[5%]`}>
                
                <aside className={`border hidden md:block`}>
                        <LeftSideNav></LeftSideNav>
                </aside>

                <aside className={`md:col-span-2 lg:col-span-3 py-[3%]`}>
                    <div>
                    {
                            !fetcheData.length ?  <EmptyData></EmptyData>: 
                            fetcheData.map(data => <PostCard setModalDT={setModalDT} toggle={toggle} setToggle={setToggle} key={data._id} data={data}></PostCard>)
                    }
                    </div>
                </aside>

            </div>
            <BookProductModal modalDT={modalDT} toggle={toggle} setToggle={setToggle}></BookProductModal>
        </section>
    );
};

export default PostData;