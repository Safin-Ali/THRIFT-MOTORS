import axios from "axios";


export async function userInfoPost (result) {
    // data algorithm
    const data = {
        firstName: result?.user?.displayName.split(' ')[0],
        lastName: result?.user?.displayName.split(' ')[1],
        userEmail: result?.user?.email,
        userContactNumber: null,
        dateOfBirth: null,
        userAvatar: result?.user?.photoURL || null,
        userRole: 'user',
        userVarified: false,
            }  
    try{
        const res = axios.post(`http://localhost:5000/userinfo`,data)
        return res
    }
    catch(e){
        return e.message || console.log(e.message)
    }
}