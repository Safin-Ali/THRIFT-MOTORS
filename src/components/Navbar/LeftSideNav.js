import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftSideNav = () => {

    const {data: allBrands} = useQuery({
        queryKey: ['allBrand'],
        queryFn: () => axios.get(`https://thrift-motors-server.vercel.app/all-brand`)
        .then(res => res.data)
    })

    return (
        <>
            <h2 className={`text-center pt-5 text-2xl font-medium`}>More Brand</h2>
            <ul>
                {allBrands?.map(brand => <li className={`my-2 p-2 border-t border-b text-center`} key={brand._id}><NavLink to={`/category/${brand._id}`}>{brand.brand}</NavLink></li>)}
            </ul>
        </>
    );
};

export default LeftSideNav;