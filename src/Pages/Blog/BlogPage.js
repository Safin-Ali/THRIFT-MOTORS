import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogCard from '../../components/blog-card/BlogCard';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';

const BlogPage = () => {

    // store blogs data
    const[blogs,setBlogs] = useState(null);

    useEffect(()=>{
        axios.get(`https://thrift-motors-server.vercel.app/blogs`)
        .then(res => setBlogs(res.data))
    },[])

    // waiting for blogs data
    if(!blogs) return <LoadingSpinner></LoadingSpinner>

    return (
        <section className={`my-[4%] mx-[4%]`}>
            {
                blogs?.map(blog => <BlogCard key={blog._id} data={blog}></BlogCard>)
            }
        </section>
    );
};

export default BlogPage;