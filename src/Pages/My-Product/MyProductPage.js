import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UnAuthorized from '../../components/404-Not-Found/UnAuthorized';
import EmptyData from '../../components/Empty-Data/EmptyData';
import MyProduct from '../../components/My-Product/MyProduct';
import { AuthUser } from '../../Context/AuthContext';
import { ToastContainer} from 'react-toastify';

const MyProductPage = () => {

    const navigate = useNavigate();

    // use AuthContext For User Data
     const {userData,notifyFaild,notifySuccess} = useContext(AuthUser);

    // get my all product
    const {data:myProduct,refetch} = useQuery({
        queryKey: ['My Product',userData?.email],
        queryFn: async () => {
                try{
                    const res = await axios.get(`http://localhost:5000/my-product/${userData?.email}`,{headers:{authorization: `Bearer ${localStorage.getItem(`jwt-token`)}`}});
                    return res.data
                }
                catch(e){
                    return e.request.status
                }
            }
    })

    // when jwt key do not decrypt
    if(myProduct === 401) return <UnAuthorized></UnAuthorized>

    // delete product
    function handleDeleteProduct (id,email) {
        axios.delete(`http://localhost:5000/postedData?id=${id}&email=${email}`,{headers:{authorization: `Bearer ${localStorage.getItem(`jwt-token`)}`}})
        .then(res => {
            if(res.data.deletedCount > 0){
                 refetch()
                 return notifySuccess('YAY! Product Deleted')
            }
        })
        .catch(e => {
            console.log(e.message)
            notifyFaild('Please Check Console')
            if(e.request.status === 401) return navigate('/error401')
        })
    }

    function advertiseProduct (id,email) {
        axios.patch(`http://localhost:5000/postedData`,{id,email},{headers:{authorization: `Bearer ${localStorage.getItem(`jwt-token`)}`}})
        .then(res => {
            if(res.data.modifiedCount > 0){
                refetch()
                return notifySuccess('advertise success full')
            }
        })
        .catch(e =>{
            console.log(e.message)
            notifyFaild('Please Check Console')
            if(e.request.status === 401) return navigate('/error401')
            return
        })
    }

    if(!myProduct?.length) return <EmptyData className={`justify-center`}></EmptyData>
    

    return (
        <>
            <section className={`mx-[5%] md:mx-[mx-7%] lg:mx-[7%]`}>
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5`}>
                    {
                        myProduct?.map( prod => <MyProduct handleDeleteProduct={handleDeleteProduct} advertiseProduct={advertiseProduct} key={prod._id} data={prod}></MyProduct>)
                    }
                </div>
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
            theme="light"
            />
        </>
    );
};

export default MyProductPage;