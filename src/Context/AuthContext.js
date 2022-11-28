import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, deleteUser, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut,updateProfile } from 'firebase/auth';
import app from '../Firebase/Firebase.init';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthUser = createContext();

const AuthContext = ({children}) => {

    const auth = getAuth(app);

    // Google Auth Provider
    const GProvider = new GoogleAuthProvider(app);

    // GitHub Auth Provider
    const GitHubProvider = new GithubAuthProvider(app);

    // observe userAuth Data
    const [userData,setUserData] = useState();

    // Waiting For User data. 
    const [loading,setLoading] = useState(true);

    // get jwn key from locale storage
    const JWTToken = localStorage.getItem('jwt-token');

    // login with email and password
    const login = (email,pass) => {
        return signInWithEmailAndPassword(auth,email,pass);
    }

    // signup auth function
    const signUp = (email,pass) => {
        return createUserWithEmailAndPassword(auth,email,pass);
    }

    // login With Google
    const loginWithGoogle = () => {
        return signInWithPopup(auth,GProvider)
    }

    // login With GitHub
    const loginWithGitHub = () => {
        return signInWithPopup(auth,GitHubProvider)
    }

    // delete account user
    const deleteAccount = () => {
        return deleteUser(auth.currentUser);
    }

    // update user profile
    const updateAuthProfile = (name,imgURL) => {
        return updateProfile(auth.currentUser,{
            displayName: name, 
            photoURL: imgURL
        });
    }

    // toastfy call
    const notifySuccess = (text) => {
        return toast.success(text,{
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    };

    // toastfy call
    const notifyFaild = (text) => {
        return toast.error(text)
    };

    // signout auth function
    const logOut = () => {
        return signOut(auth);
    }

    // get your information
    const {data:currUserInfo,isLoading,refetch} = useQuery({
        queryKey: ['User Information',userData?.email],
        queryFn: async () => {
            try{
                const res = await axios.get(`http://localhost:5000/userInfo?email=${userData?.email}`,{headers:{authorization: `Bearer ${localStorage.getItem(`jwt-token`)}`}});
                return res.data
            }
            catch(e){
                console.log(e.message)
                return undefined
            }
        }
    })

    useEffect(()=>{
        const unSusb = onAuthStateChanged(auth,user=>{
            setUserData(user)
            setLoading(false)
        })
        return () => unSusb()
    },[])

    // all variable,function,userdata of Object
    const authInfo = {userData,loading,logOut,signUp,login,updateAuthProfile,loginWithGoogle,loginWithGitHub,currUserInfo,isLoading,refetch,JWTToken,deleteAccount,notifySuccess,notifyFaild}
    return (
        <AuthUser.Provider value={authInfo}>{children}</AuthUser.Provider>
    );
};

export default AuthContext;