import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from '../Firebase/Firebase.init';

export const AuthUser = createContext();

const AuthContext = ({children}) => {

    const auth = getAuth(app);

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

    // signout auth function

    const logOut = () => {
        return signOut(auth);
    }

    useEffect(()=>{
        const unSusb = onAuthStateChanged(auth,user=>{
            setUserData(isFinite)
            setLoading(false)
        })
        return () => unSusb()
    },[])


    // all variable,function,userdata of Object
    const authInfo = {userData,loading,logOut,signUp,login}
    return (
        <AuthUser.Provider value={authInfo}>{children}</AuthUser.Provider>
    );
};

export default AuthContext;