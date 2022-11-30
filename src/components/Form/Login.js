import React, { useContext, useState, } from "react";
import {useForm} from 'react-hook-form';
import PrimaryButton from "../primary-button/PrimaryButton";
import {FcGoogle} from "react-icons/fc";
import { AuthUser } from "../../Context/AuthContext";
import { Link,useLocation, useNavigate } from "react-router-dom";
import {FaEyeSlash, FaRegEye} from 'react-icons/fa';
import { userInfoPost } from "../../Hook/userInfoPost";
import { ToastContainer } from "react-toastify";
import { generateJWT } from "../../Hook/generateJWT";


const Login = () => {

    // use AuthContext For User Data
    const {loginWithGoogle,loginWithGitHub,login,notifySuccess,notifyFaild} = useContext(AuthUser);

    // toggle password hide/visible
    const[passToggle,setPassToggle] = useState(false);

    // assign new route / change route path using by this hook
    const navigate = useNavigate();

    // get form all value oin object
    const {register,handleSubmit,reset} = useForm();

    // get current location Object data in this hook
    const location = useLocation();

    // get requested location
    const from = location.state?location.state : '/';

    // Login With Google
    async function handleLoginWithGoogle (provider) {
      try{
        if(provider === 'google') {

          const result = await loginWithGoogle();   

          const postdata = await userInfoPost(result);

          if(postdata.data.acknowledged){

            notifySuccess('Login Successfull')

             // generate token JWT
          await generateJWT(result?.user?.email);
          await  notifySuccess(`Encrypt token Added`)
          return navigate(from);

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

    // new promise for waiting prepare home page
    function prepareHome () {
      return new Promise((res,rej)=>{
        setTimeout(()=>{
          return res(true)
        },2500)
      })
    }

    // form all values
    async function onLogin(data){
      try{
      // call firebase signup function         
      const res = await login(data.userEmail,data.password);
      if(res) {
        generateJWT(res.user.email)
        notifySuccess('Login Success Full Please Wait')
        await prepareHome()
        reset()
        return navigate(from)
      }
      }
      catch(e){
        notifyFaild(e.message)
      }
    }

  return (
    <>
    <section className={`grid mx-[5%] md:grid-cols-2 grid-cols-1 gap-x-10 justify-center items-center min-h-screen max-h-full`}>

    <div>
      <img className={`w-full h-auto`} src="https://i.ibb.co/PwVZRMc/Authentication-pana.png" alt="Auth_Banner" />
    </div>

      <div className={`border bg-whiteCard drop-shadow-md py-[6%] mb-[3%] px-[3%] w-full lg:w-[60%] mx-auto`}>
      <h2 className={`text-4xl text-center my-2 font-semibold text-common uppercase`}>Login</h2>

        <form onSubmit={handleSubmit(onLogin)}>
          <div className={`text-center`}>

            {/* Email Feild */}
            <div className={`my-2`}><input type="email" {...register('userEmail')} className={`border focus:outline-none bg-whiteCard pl-5 w-[90%] focus:border-common focus:border-b-2 focus:border-0 p-2 rounded-sm`} placeholder={'Your Email'} required/>
            </div>
            
            {/* Password Feild */}
            <div className={`my-2 relative`}>
                <input type={passToggle? 'text' : 'password'} {...register('password')} className={`border focus:outline-none bg-whiteCard w-[90%] z-[1] focus:border-common focus:border-b-2 focus:border-0 p-2 rounded-sm pl-5`} placeholder='Enter Password'required/>
                {
                  passToggle ?
                  <FaEyeSlash onClick={()=>setPassToggle(!passToggle)} className={`absolute cursor-pointer right-[10%] top-1/2 -translate-y-1/2`}></FaEyeSlash>
                  :
                  <FaRegEye onClick={()=>setPassToggle(!passToggle)} className={`absolute cursor-pointer right-[10%] top-1/2 -translate-y-1/2`}></FaRegEye>
                }
            </div>

            <div><span className={`font-medium`}>No Account?</span> <Link className={`text-common underline`} to={`/signup`}>registration</Link></div>
            
          </div>
          <div className={`text-center`}>
            <PrimaryButton className={`bg-transparent w-[90%] border hover:text-white border-common duration-150 hover:bg-common`}>LOGIN</PrimaryButton>
          </div>
        </form>
        <div onClick={()=> handleLoginWithGoogle('google')} className={`flex cursor-pointer justify-center items-center p-2 rounded-sm border w-[90%] mx-auto`}>
          <p className={`font-medium`}>CONTINUE WITH GOOGLE</p>
          <FcGoogle className={`text-3xl border rounded-[50%] mx-2`}></FcGoogle>
        </div>
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
            theme="light"/>
    </>
  );
};

export default Login;
