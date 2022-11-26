import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import MyProduct from '../../components/My-Product/MyProduct';
import { AuthUser } from '../../Context/AuthContext';

const MyProductPage = () => {

    // use AuthContext For User Data
     const {userData} = useContext(AuthUser);

    // get your information
    const {data:currUserInfo} = useQuery({
        queryKey: ['User Information',userData?.email],
        queryFn: async () => {
                const res = await axios.get(`http://localhost:5000/userInfo?email=${userData?.email}`);
             return res.data
        }
    })

    // get your information
    const {data:myProduct,refetch} = useQuery({
        queryKey: ['My Product',userData?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/my-product/${userData?.email}`);
            return res.data
        }
    })

    // delete product

    function handleDeleteProduct (id,email) {
        axios.delete(`http://localhost:5000/postedData?id=${id}&email=${email}`)
        .then(res => {
            if(res.data.deletedCount > 0){
                window.alert('delete success full')
                return refetch()
            }
        })
    }

    return (
        <section className={`mx-5`}>
            <div className={`grid grid-cols-3 gap-5`}>
                {
                    myProduct?.map( prod => <MyProduct handleDeleteProduct={handleDeleteProduct} key={prod._id} data={prod}></MyProduct>)
                }
            </div>
        </section>
    );
};

export default MyProductPage;