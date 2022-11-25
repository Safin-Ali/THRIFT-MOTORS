import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut,updateProfile } from 'firebase/auth';
import app from '../Firebase/Firebase.init';

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

    // update user profile
    const updateAuthProfile = (name,imgURL) => {
        return updateProfile(auth.currentUser,{
            displayName: name, 
            photoURL: imgURL
        });
    }

    // signout auth function
    const logOut = () => {
        return signOut(auth);
    }

    console.log(userData)

    useEffect(()=>{
        const unSusb = onAuthStateChanged(auth,user=>{
            setUserData(user)
            setLoading(false)
        })
        return () => unSusb()
    },[])


    // all variable,function,userdata of Object
    const authInfo = {userData,loading,logOut,signUp,login,updateAuthProfile,loginWithGoogle,loginWithGitHub}
    return (
        <AuthUser.Provider value={authInfo}>{children}</AuthUser.Provider>
    );
};

export default AuthContext;