import React, { useContext, } from "react";
import {useForm} from 'react-hook-form';
import PrimaryButton from "../primary-button/PrimaryButton";
import {FcGoogle} from "react-icons/fc";
import {GrGithub} from "react-icons/gr";
import { AuthUser } from "../../Context/AuthContext";
import { Link,useLocation, useNavigate } from "react-router-dom";
import { userInfoPost } from "../../Hook/userInfoPost";
import { ToastContainer } from "react-toastify";
import { generateJWT } from "../../Hook/generateJWT";


const Login = () => {

    // use AuthContext For User Data
    const {loginWithGoogle,loginWithGitHub,login,notifySuccess,notifyFaild} = useContext(AuthUser);

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

    // form all values
    async function onLogin(data){
      // call firebase signup function         
      const res = await login(data.userEmail,data.password);
      if(res) {
        await generateJWT(res.user.email)
        await reset()
        await navigate(from)
      }
    }

  return (
    <section className={`w-full mx-auto flex gap-x-10 justify-center items-center min-h-screen max-h-screen`}>

    <div className={`w-1/2`}>
      <img className={`w-full h-auto`} src="https://i.ibb.co/PwVZRMc/Authentication-pana.png" alt="Auth_Banner" />
    </div>

      <div className={`border shadow-md py-[2%] px-[3%]`}>

      <h2 className={`text-4xl text-center my-2 font-semibold text-common uppercase`}>Login</h2>

        <form onSubmit={handleSubmit(onLogin)}>
          <div className={`text-center`}>

            {/* Email Feild */}
            <div className={`my-2`}><input type="email" {...register('userEmail')} className={`border focus:outline-none focus:border-common focus:border-b-2 focus:border-0 p-2 rounded-sm`} placeholder={'Your Email'} required/>
            </div>

            {/* Password Feild */}
            <div className={`my-2`}><input type="password" {...register('password')} className={`border focus:outline-none focus:border-common focus:border-b-2 focus:border-0 p-2 rounded-sm`} placeholder='Enter Password'required/>
            </div>

            <div>No account? <Link className={`text-common underline`} to={`/signup`}>registration</Link></div>
            
          </div>
          <div className={`text-center`}>
            <PrimaryButton className={`bg-transparent border hover:text-white border-common duration-150 hover:bg-common`}>LOGIN</PrimaryButton>
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

export default Login;
