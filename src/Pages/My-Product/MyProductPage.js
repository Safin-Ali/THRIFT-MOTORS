import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import EmptyData from '../../components/Empty-Data/EmptyData';
import MyProduct from '../../components/My-Product/MyProduct';
import { AuthUser } from '../../Context/AuthContext';

const MyProductPage = () => {

    // use AuthContext For User Data
     const {userData} = useContext(AuthUser);

    // get my all product
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

    function advertiseProduct (id,email) {
        axios.patch(`http://localhost:5000/postedData`,{id,email})
        .then(res => {
            if(res.data.modifiedCount > 0){
                window.alert('advertise success full')
                return refetch()
            }
        })
    }

    if(!myProduct?.length) return <EmptyData className={`justify-center`}></EmptyData>

    return (
        <section className={`mx-5`}>
            <div className={`grid grid-cols-3 gap-5`}>
                {
                    myProduct?.map( prod => <MyProduct handleDeleteProduct={handleDeleteProduct} advertiseProduct={advertiseProduct} key={prod._id} data={prod}></MyProduct>)
                }
            </div>
        </section>
    );
};

export default MyProductPage;