import React, { createRef, useContext, useState } from "react";
import {useForm} from 'react-hook-form';
import PrimaryButton from "../primary-button/PrimaryButton";
import {BiImageAdd} from "react-icons/bi";
import {FcGoogle} from "react-icons/fc";
import {GrGithub} from "react-icons/gr";
import { AuthUser } from "../../Context/AuthContext";
import axios from 'axios';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';

const Signup = () => {

    // use AuthContext For User Data
    const {updateAuthProfile,signUp,loginWithGoogle,loginWithGitHub,userData} = useContext(AuthUser);

    // get current location Object data in this hook
    const location = useLocation();

    // assign new route / change route path using by this hook
    const navigate = useNavigate();

    // get requested location
    const from = location.state ? location.state : '/';

    // get form all value oin object
    const {register,handleSubmit,reset} = useForm();

    // get selected role
    const userRole = createRef();

    // store user selectd role
    const[selRole,setUserRole] = useState('user');

    // Login With Google
    function handleLoginWithGoogle (provider) {
      if(provider === 'google') {
        loginWithGoogle()
        .then(result => console.log(result))
        .catch(e => console.log(e.message))
      }
      if(provider === 'gitHub') {
        loginWithGitHub()
        .then(result => console.log(result))
        .catch(e => console.log(e.message))
      }
    }

    // form all values
    function onSubmit(data){
      // set user account role
        data['userRole'] = selRole;  

        // conver image file and post image to the imgbb
        const imgFormData = new FormData();
        imgFormData.append('image',data.userAvatar[0])

        // imgbb api connect
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API}`

        // post user image to imgbb
        axios.post(url,imgFormData)
        .then(res => {

          // if image upload successfull then work else

          if(res.data.success) {
            // reassign user image url
            data.userAvatar = res.data.data.url;

            // concat with user first name + last name
            const fullName = data.firstName.concat(' ',data.lastName);

            // call firebase signup function
            signUp(data.userEmail,data.password)
            
            .then(res => {
              updateAuthProfile(fullName,data.userAvatar)
              .then(res => {})
              .catch(e => console.log(e.message))

              // post user information to userInfo server
              axios.post(`http://localhost:5000/userinfo`,data)
                .then(res => {

                  // if post successfull then popup toast
                  if(res.data.acknowledged){
                    reset()
                    window.alert('Wow Your are signin')
                    return navigate(from)
                  }
                })
            })
            .catch(e => console.log(e.message))
          }
        })
    }

    if(userData) return <Navigate to={from}></Navigate>

    return (
      <section className={`w-4/6/6 mx-auto flex justify-center items-center min-h-screen max-h-screen`}>
        <div className={`border shadow-md py-[2%] px-[3%]`}>
  
        <h2 className={`text-4xl text-center my-2 font-semibold`}>Create Account</h2>
  
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`grid grid-cols-2 gap-4`}>
  
              {/* First Name Feild */}
              <div><input type="text" {...register('firstName')} className={`border focus:outline-none focus:border-common focus:border-b-2 focus:border-0 p-2 rounded-sm`} placeholder={'First Name'} required/>
              </div>
  
              {/* Last Name Feild */}
              <div><input type="text" {...register('lastName')} className={`border focus:outline-none focus:border-common focus:border-b-2 focus:border-0 p-2 rounded-sm`} placeholder={'Last Name'} required/>
              </div>
  
              {/* Email Feild */}
              <div><input type="email" {...register('userEmail')} className={`border focus:outline-none focus:border-common focus:border-b-2 focus:border-0 p-2 rounded-sm`} placeholder={'Your Email'} required/>
              </div>
  
              {/* Phone Number Feild */}
              <div><input type="text" {...register('userContactNumber')} className={`border focus:outline-none focus:border-common focus:border-b-2 focus:border-0 p-2 rounded-sm`} placeholder={'Phone Number'} />
              </div>
  
              {/* Date Feild */}
              <div className={`text-center`}><input type="date" {...register('dateOfBirth')} className={`border focus:outline-none focus:border-common focus:border-b-2 focus:border-0 p-2 rounded-sm`}/>
              </div>
  
  
              {/* Role Feild */}
              <div className={`text-center`}>
                  <select ref={userRole} onChange={() => setUserRole(userRole.current.value)} className={`border focus:outline-none focus:border-common focus:border-b-2 focus:border-0 p-2 rounded-l`}>
                      <option value="user">User</option>
                      <option value="seller">Seller</option>
                  </select>
              </div>
  
              {/* Password Feild */}
              <div className={`text-center`}><input type="password" {...register('password')} className={`border focus:outline-none focus:border-common focus:border-b-2 focus:border-0 p-2 rounded-sm`} placeholder='Enter Password'required/>
              </div>
  
              {/* Confirm Password Feild */}
              <div className={`text-center`}><input type="password" {...register('confirmPassword')} className={`border focus:outline-none focus:border-common focus:border-b-2 focus:border-0 p-2 rounded-sm`} placeholder='Confirm Password' required/>
              </div>
  
              {/* Image Upload */}            
              <div className="flex col-span-2 items-center justify-center my-2">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                      <div className="flex px-10 text-lightgray flex-col items-center justify-center">
                          <p className="mb-2"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                              <BiImageAdd className={`text-2xl m-3`}></BiImageAdd>
                          <p>SVG, PNG, JPG (MAX. 300x300px)</p>
                      </div>
                      <input id="dropzone-file" {...register('userAvatar')} type="file" className="hidden" required={true}/>
                  </label>
              </div> 
  
              
            </div>
            
            {/* submit button */}
            <div className={`text-center`}>
              <PrimaryButton className={`bg-transparent border hover:text-white border-common duration-150 hover:bg-common`}>SIGNUP</PrimaryButton>
            </div>
          </form>
          <div className={`flex justify-center`}>
            <FcGoogle onClick={()=> handleLoginWithGoogle('google')} className={`text-3xl cursor-pointer border rounded-[50%] mx-2`}></FcGoogle>
            <GrGithub onClick={()=> handleLoginWithGoogle('gitHub')} className={`text-3xl cursor-pointer border rounded-[50%] mx-2`}></GrGithub>
          </div>
        </div>
      </section>
    );
};

export default Signup;
