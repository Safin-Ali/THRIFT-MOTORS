import axios from 'axios';
import React, {useContext, useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { generateDate } from '../date-generate/dateGenerate';
import { AuthUser } from '../../Context/AuthContext';
import { generateImgURL } from '../image-url-generate/imgURLGenerate';
import {BiImageAdd} from "react-icons/bi";
import PrimaryButton from "../primary-button/PrimaryButton";
import LoadingSpinner from '../Spinner/LoadingSpinner';
import { Navigate, useNavigate } from 'react-router-dom';


const AddProduct = () => {

    // use AuthContext For User Data
    const {userData,isLoading,currUserInfo} = useContext(AuthUser);

    // get form all value in object
    const {register,handleSubmit,reset} = useForm();

    // store there brand info on matches with form brand
    const [brandInfo,setBrandInfo] = useState();

    const[allBrand,setAllBrand] = useState();

    const navigate =  useNavigate();

    // get brand data
    useEffect(()=>{
        axios.get(`http://localhost:5000/all-brand`)
        .then(res => {
            setAllBrand(res.data)
            setBrandInfo(res.data[0])
        })
    },[])

    if(!currUserInfo) return <LoadingSpinner></LoadingSpinner>
    
    // get brand info
    function handleBrandInfo (e) {

        // get current event value
        e.preventDefault();
        const currentEvent = e.target.value;
        const matchesBrand = allBrand.find(brand => brand.brand === currentEvent);
        return setBrandInfo(matchesBrand)
    }

    //  syncronously post product
    async function onPost ({resalePrice,sellCarModel,originalPrice,carModelYear,usedTime,area,roadNo,city,country,phoneNumber,carImg}) {
        try{
            const getTime = await generateDate();

             const getImageURL = await generateImgURL(carImg);
    
            // data structure algorithm
            const data = {
    
                resalePrice:resalePrice,
                
                usedTime:usedTime,
    
                carInfo: {sellCarModel: sellCarModel,brand:brandInfo.brand,brandLogo: brandInfo.brandLogo,originalPrice: originalPrice,carModelYear: carModelYear},
    
                location: {area:area,roadNo:roadNo,city:city,country:country},
                sellCarImg: getImageURL,
    
                postedTime: getTime,
    
                postOwnerInfo: {email: userData?.email,phoneNumber: phoneNumber,photo:userData?.photoURL || currUserInfo?.userAvatar,name: userData?.displayName,varified:currUserInfo.userVarified},
                paid: false,
    
                serviceId: brandInfo._id,

                advertise: false
            }

            // post all data
            const res = await axios.post(`http://localhost:5000/new-post`,data)
            if(res.data.acknowledged) {
                reset()
                window.alert('Wow Post Done')
                navigate(`/my-product/:${userData?.email}`)
            }
        }
        catch(e){
            console.log(e.message)
        }
    }

    // wait for user information
    if(isLoading) return <LoadingSpinner></LoadingSpinner>;

    // if(!currUserInfo?.email)
    if(!currUserInfo && currUserInfo.userRole !== 'seller') return <Navigate to={`/`}></Navigate>


    return (
        <section>
            <div className={`w-2/3 mx-auto`}>
                <form onSubmit={handleSubmit(onPost)}>
                    <div className={`grid grid-cols-3 justify-center pt-5 gap-3`}>

                        {/* select car brand */}
                        <div className={` w-fulllg:w-[85%] lg:w-[95%] col-span-3 lg:col-span-1 lg:mx-auto`}>
                            <select onChange={handleBrandInfo} className={`border w-full focus:outline-none focus:border-common focus:border-b-2 focus:border-0 p-2 rounded-l`}>
                                {
                                    allBrand?.map( brand => <option key={brand._id} value={brand.brand}>{brand.brand}</option>)
                                }
                            </select>
                        </div>

                        {/*car model feild*/}
                        <div className={`my-2 w-full lg:w-[95%] col-span-3 lg:col-span-1 mx-auto`}><input type="text" {...register('sellCarModel')} className={`border w-full lg:w-[85%] focus:outline-none focus:border-common focus:border-b-2 focus:shadow-md focus:border-0 p-2 rounded-sm`} placeholder='Car Model'required/>
                        </div>

                        {/* car model year feild */}
                        <div className={`my-2 w-full lg:w-[95%] col-span-3 lg:col-span-1 mx-auto`}><input type="text" {...register('carModelYear')} className={`border w-full lg:w-[85%] focus:outline-none focus:border-common focus:border-b-2 focus:shadow-md focus:border-0 p-2 rounded-sm`} placeholder='Car Model Year'required/>
                        </div>

                        {/* card base price feild */}
                        <div className={`my-2 w-full lg:w-[95%] col-span-3 lg:col-span-1 mx-auto`}><input type="text" {...register('originalPrice')} className={`border w-full lg:w-[85%] focus:outline-none focus:border-common focus:border-b-2 focus:shadow-md focus:border-0 p-2 rounded-sm`} placeholder='Car Original Price'required/>
                        </div>

                        {/* car used time feild */}
                        <div className={`my-2 w-full lg:w-[95%] col-span-3 lg:col-span-1 mx-auto`}><input type="text" {...register('usedTime')} className={`border w-full lg:w-[85%] focus:outline-none focus:border-common focus:border-b-2 focus:shadow-md focus:border-0 p-2 rounded-sm`} placeholder='Car Used Time'required/>
                        </div>

                        {/* car sell price feild */}
                        <div className={`my-2 w-full lg:w-[95%] col-span-3 lg:col-span-1 mx-auto`}><input type="text" {...register('resalePrice')} className={`border w-full lg:w-[85%] focus:outline-none focus:border-common focus:border-b-2 focus:shadow-md focus:border-0 p-2 rounded-sm`} placeholder='Car Sell price'required/>
                        </div>

                        {/* location area feild */}
                        <div className={`my-2 w-full lg:w-[95%] col-span-3 lg:col-span-1 mx-auto`}><input type="text" {...register('area')} className={`border w-full lg:w-[85%] focus:outline-none focus:border-common focus:border-b-1 focus:shadow-md focus:border-0 p-2 rounded-sm`} placeholder='Area'required/>
                        </div>

                        {/* location roadNo feild */}
                        <div className={`my-2 w-full lg:w-[95%] col-span-3 lg:col-span-1 mx-auto`}><input type="text" {...register('roadNo')} className={`border w-full lg:w-[85%] focus:outline-none focus:border-common focus:border-b-2 focus:shadow-md focus:border-0 p-2 rounded-sm`} placeholder='Road No'required/>
                        </div>

                        {/* location city feild */}
                        <div className={`my-2 w-full lg:w-[95%] col-span-3 lg:col-span-1 mx-auto`}><input type="text" {...register('city')} className={`border w-full lg:w-[85%] focus:outline-none focus:border-common focus:border-b-2 focus:shadow-md focus:border-0 p-2 rounded-sm`} placeholder='City'required/>
                        </div>

                        {/* location country feild */}
                        <div className={`my-2 w-full lg:w-[95%] col-span-3 lg:col-span-1 mx-auto`}><input type="text" {...register('country')} className={`border w-full lg:w-[85%] focus:outline-none focus:border-common focus:border-b-2 focus:shadow-md focus:border-0 p-2 rounded-sm`} placeholder='Country'required/>
                        </div>

                        {/* contact number */}
                        <div className={`my-2 w-full lg:w-[95%] col-span-3 lg:col-span-1 mx-auto`}><input type="text" {...register('phoneNumber')} className={`border w-full lg:w-[85%] focus:outline-none focus:border-common focus:border-b-2 focus:shadow-md focus:border-0 p-2 rounded-sm`} placeholder='Phone Number' required/>
                        </div>

                        {/* user email feild */}
                        <div className={`my-2 w-full lg:w-[95%] col-span-3 lg:col-span-1 mx-auto`}><input type="email" {...register('userEmail')} className={`border w-full lg:w-[85%] focus:outline-none focus:border-common focus:border-b-2 focus:shadow-md focus:border-0 p-2 rounded-sm`} defaultValue={userData?.email} readOnly/>
                        </div>

                        {/* user name feild */}
                        <div className={`my-2 w-full lg:w-[95%] col-span-3 lg:col-span-1 mx-auto`}><input type="text"  className={`border w-full lg:w-[85%] focus:outline-none focus:border-common focus:border-b-2 focus:shadow-md focus:border-0 p-2 rounded-sm`} defaultValue={userData?.displayName} readOnly/>
                        </div>

                        {/* Image Upload */}            
                        <div className="flex col-span-3 items-center justify-center my-2">
                            <label htmlFor="dropzone-file" className="flex mx-5 flex-col items-center justify-center h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                                <div className="flex px-10 text-lightgray flex-col items-center justify-center text-center">
                                    <p className="mb-2"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <BiImageAdd className={`text-2xl m-3`}></BiImageAdd>
                                    <p>SVG, PNG, JPG (MAX. 650x500px)</p>
                                </div>
                                <input id="dropzone-file" {...register('carImg')} type="file" className="text-center" required/>
                            </label>
                        </div> 

                        {/* Submit button */}
                        <div className={`text-center col-span-3`}>
                        <PrimaryButton className={`bg-transparent border hover:text-white border-common duration-150 hover:bg-common`}>SUBMIT</PrimaryButton>
                        </div>

                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddProduct;