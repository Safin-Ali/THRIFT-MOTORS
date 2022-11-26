import React from 'react';

const BlogCard = ({data}) => {
    const {ask,answer} = data;
    return (
        <div className={`p-5 shadow-md border text-center my-5`}>
            <h1 className={`text-3xl my-5 font-semibold text-blackSA underline underline-offset-4`}>{ask}</h1>
            <p className={`text-lg font-medium`}>{answer}</p>
        </div>
    );
};

export default BlogCard;