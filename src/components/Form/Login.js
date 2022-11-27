import React, { useContext, } from "react";
import {useForm} from 'react-hook-form';
import PrimaryButton from "../primary-button/PrimaryButton";
import {FcGoogle} from "react-icons/fc";
import {GrGithub} from "react-icons/gr";
import { AuthUser } from "../../Context/AuthContext";
import { Link,useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

    // use AuthContext For User Data
    const {loginWithGoogle,loginWithGitHub,login} = useContext(AuthUser);

    // assign new route / change route path using by this hook
    const navigate = useNavigate();

    // get form all value oin object
    const {register,handleSubmit,reset} = useForm();

    // get current location Object data in this hook
    const location = useLocation();

    // get requested location
    const from = location.state?location.state : '/';

    // Login With Google
    function handleLoginWithGoogle (provider) {
      if(provider === 'google') {
        loginWithGoogle()
        .then(result => navigate(from))
        .catch(e => console.log(e.message))
      }
      if(provider === 'gitHub') {
        loginWithGitHub()
        .then(result => navigate(from))
        .catch(e => console.log(e.message))
      }
    }

    // request api for JWT encrypt token
    function getJWTToken(email){
      axios.get(`http://localhost:5000/jwt?email=${email}`)
      .then(res => localStorage.setItem('jwt-token',res.data.encryptToken))
    }

    // form all values
    async function onLogin(data){
      // call firebase signup function         
      const res = await login(data.userEmail,data.password);
      if(res) {
        await getJWTToken(res.user.email)
        await reset()
        await alert('login Success')
        await navigate(from)
      }
    }

  return (
    <section className={`w-4/6/6 mx-auto flex justify-center items-center min-h-screen max-h-screen`}>
      <div className={`border shadow-md py-[2%] px-[3%]`}>

      <h2 className={`text-4xl text-center my-2 font-semibold`}>Login</h2>

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
