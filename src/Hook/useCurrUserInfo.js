import { async } from "@firebase/util";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthUser } from "../Context/AuthContext";

export function useCurrUserInfo () {
    const {userData} = useContext(AuthUser);
    const [currUserInfo,setCurInfo] = useState(null);
    useEffect(()=>{
        axios.get(`http://localhost:5000/userInfo?email=${userData?.email}`,{headers:{authorization: `Bearer ${localStorage.getItem(`jwt-token`)}`}})
        .then(res => setCurInfo(res.data))
        .catch(e => {
            console.log(e.message)
            setCurInfo(null)
        })
    },[userData?.email])
    return currUserInfo
    }