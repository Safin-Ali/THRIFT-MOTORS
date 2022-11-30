import React, { createRef, useContext, useState } from "react";
import {useForm} from 'react-hook-form';
import PrimaryButton from "../primary-button/PrimaryButton";
import {BiImageAdd} from "react-icons/bi";
import {FcGoogle} from "react-icons/fc";
import { AuthUser } from "../../Context/AuthContext";
import axios from 'axios';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import { userInfoPost } from "../../Hook/userInfoPost";
import { ToastContainer } from "react-toastify";
import { generateJWT } from "../../Hook/generateJWT";

const Signup = () => {

    // use AuthContext For User Data
    const {updateAuthProfile,userData,signUp,loginWithGoogle,loginWithGitHub,notifySuccess,notifyFaild} = useContext(AuthUser);

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

    // new promise for waiting prepare home page
    function prepareHome () {
      return new Promise((res,rej)=>{
        setTimeout(()=>{
          return res(true)
        },2500)
      })
    }    

    // Login With Google
    async function handleLoginWithGoogle (provider) {
      try{
        if(provider === 'google') {

          const result = await loginWithGoogle();   

          const postdata = await userInfoPost(result);

          if(postdata.data.acknowledged){

            await generateJWT(result?.user?.email);
            notifySuccess('Login Successfull')
             // generate token JWT
            notifySuccess(`Encrypt token Added`)
            console.log('1')
            await prepareHome()
            console.log('2')
          // return navigate(from);

          }
        }

        if(provider === 'gitHub') {
          const result = await loginWithGitHub();              
          // const postdata = await userInfoPost(result);
          console.log(result)
        }
      }
      catch(e){
         notifyFaild(e.message)
      }
    }

    // form all values
    function onSubmit(data){

      if(data.confirmPassword !== data.password) return notifyFaild('Wrong Password')

      // set user account role
        data['userRole'] = selRole;
        data['userVarified'] = false;

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
              axios.post(`https://thrift-motors-server.vercel.app/userinfo`,data)
                .then(res => {

                  // if post successfull then popup toast
                  if(res.data.acknowledged){
                    reset()
                    notifySuccess(`Wow Your Are Signup`)
                    return navigate(from)
                  }
                })
            })
            .catch(e => notifyFaild(e.message))
          }
        })
    }

    if(userData) return <Navigate to={from}></Navigate>

    return (
      <section className={`flex mx-[2%] my-[5%] md:flex-row justify-center items-center`}>

        <div className={`w-1/2 hidden lg:block`}>
          <img className={`w-full h-auto`} src="https://i.ibb.co/GktZDfH/Tablet-login-rafiki.png" alt="Banner_Image" />
        </div>

        <div className={`border shadow-md py-[2%] px-[3%]`}>
  
        <h2 className={`text-2xl md:text-4xl text-center my-2 text-common font-semibold uppercase`}>Create Account</h2>
  
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`grid lg:grid-cols-2 gap-4`}>
  
              {/* First Name Feild */}
              <div className={`col-span-1 text-center`}><input type="text" {...register('firstName')} className={`border focus:outline-none focus:border-common bg-whiteCard focus:border-b-2 col-span-2 text-center focus:border-0 p-0.5 md:p-1.5 rounded-sm`} placeholder={'First Name'} required/>
              </div>
  
              {/* Last Name Feild */}
              <div className={`col-span-1 text-center`}><input type="text" {...register('lastName')} className={`border focus:outline-none focus:border-common bg-whiteCard focus:border-b-2 col-span-2 text-center focus:border-0 p-0.5 md:p-1.5 rounded-sm`} placeholder={'Last Name'} required/>
              </div>
  
              {/* Email Feild */}
              <div className={`col-span-1 text-center`}><input type="email" {...register('userEmail')} className={`border focus:outline-none focus:border-common bg-whiteCard focus:border-b-2 col-span-2 text-center focus:border-0 p-0.5 md:p-1.5 rounded-sm`} placeholder={'Your Email'} required/>
              </div>
  
              {/* Phone Number Feild */}
              <div className={`col-span-1 text-center`}><input type="text" {...register('userContactNumber')} className={`border focus:outline-none focus:border-common bg-whiteCard focus:border-b-2 col-span-2 text-center focus:border-0 p-0.5 md:p-1.5 rounded-sm`} placeholder={'Phone Number'} />
              </div>
  
              {/* Date Feild */}
              <div className={`text-center col-span-1`}><input type="date" {...register('dateOfBirth')} className={`border focus:outline-none focus:border-common bg-whiteCard focus:border-b-2 col-span-2 text-center focus:border-0 p-0.5 md:p-1.5 rounded-sm`}/>
              </div>
  
  
              {/* Role Feild */}
              <div className={`text-center col-span-1`}>
                  <select ref={userRole} onChange={() => setUserRole(userRole.current.value)} className={`border focus:outline-none focus:border-common bg-whiteCard focus:border-b-2 col-span-2 text-center focus:border-0 p-0.5 md:p-1.5 rounded-l`}>
                      <option value="user">User</option>
                      <option value="seller">Seller</option>
                  </select>
              </div>
  
              {/* Password Feild */}
              <div className={`text-center col-span-1`}><input type="password" {...register('password')} className={`border focus:outline-none focus:border-common bg-whiteCard focus:border-b-2 col-span-2 text-center focus:border-0 p-0.5 md:p-1.5 rounded-sm`} placeholder='Enter Password'required/>
              </div>
  
              {/* Confirm Password Feild */}
              <div className={`text-center col-span-1 `}><input type="password" {...register('confirmPassword')} className={`border focus:outline-none focus:border-common bg-whiteCard focus:border-b-2 col-span-2 text-center focus:border-0 p-0.5 md:p-1.5 rounded-sm`} placeholder='Confirm Password' required/>
              </div>
  
              {/* Image Upload */}            
              <div className="flex col-span-2 w-[80%] mx-auto md:w-auto text-center items-center justify-center my-2">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer bg-">
                      <div className="flex px-10 text-lightgray flex-col items-center justify-center">
                          <p className="mb-2"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                              <BiImageAdd className={`text-2xl m-3`}></BiImageAdd>
                          <p>SVG, PNG, JPG (MAX. 300x300px)</p>
                      </div>
                      <input id="dropzone-file" {...register('userAvatar')} type="file" className="hidden" required={true}/>
                  </label>
              </div> 

                <p className={`text-lg col-span-2 text-center opacity-[0.6] font-medium`}>Must be Upload Picture</p>
              
            </div>
            
            {/* submit button */}
            <div className={`text-center col-span-2 `}>
              <PrimaryButton className={`bg-transparent border hover:text-white border-common duration-150 hover:bg-common w-[80%] hover:shadow-md`}>SIGNUP</PrimaryButton>
            </div>

            <div className={`text-center col-span-2 `}>
              <p>Have a account? Please <Link className={`text-common underline`} to={`/login`}>login</Link></p>
            </div>
          </form>
          <div className="my-3 flex justify-center items-center">
            <span className={`w-full inline-block h-[1px] bg-common`}></span><span>X</span><span className={`w-full inline-block h-[1px] bg-common`}></span>
          </div>
          
          <div onClick={()=> handleLoginWithGoogle('google')} className={`flex cursor-pointer justify-center items-center p-2 rounded-sm border w-[90%] mx-auto`}>
          <p className={`font-medium`}>CONTINUE WITH GOOGLE</p>
          <FcGoogle className={`text-3xl border rounded-[50%] mx-2`}></FcGoogle>
          </div>
          </div>
          
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
            theme="light"/>
      </section>
    );
};

export default Signup;
