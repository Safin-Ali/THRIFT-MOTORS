import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import LeftSideNav from '../../components/Navbar/LeftSideNav';
import PostCard from '../../components/post-card/PostCard';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';

const PostData = () => {

    const fetcheData = useLoaderData();

    console.log(fetcheData)

    if(!fetcheData || !fetcheData.length) return <LoadingSpinner></LoadingSpinner>

    return (
        <section>
            <div className={`grid grid-cols-4 gap-[5%]`}>
                
                <div className={`border`}>
                        <LeftSideNav></LeftSideNav>
                </div>

                <div className={`col-span-2 py-[3%]`}>
                {
                        fetcheData.map(data => <PostCard key={data._id} data={data}></PostCard>)
                }
                </div>

                <div className={`border`}>
                        <p>Right Nav</p>
                </div>

            </div>
        </section>
    );
};

export default PostData;