import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthUser } from '../../Context/AuthContext';

const DashboardPage = () => {

    // use AuthContext For User Data
     const {userData} = useContext(AuthUser);

    const {data:allUsersInfo} = useQuery({
        queryKey: ['User Information',userData?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/userInfo?email=${userData?.email}`);
            return res.data
        }
    })
    return (
        <div>
            i am dashboard
        </div>
    );
};

export default DashboardPage;