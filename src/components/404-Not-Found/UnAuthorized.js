import React, { useContext, useEffect } from 'react';
import { AuthUser } from '../../Context/AuthContext';

const UnAuthorized = () => {

    const {logOut} = useContext(AuthUser);

    useEffect(()=>{
        logOut()
        .then(() => localStorage.removeItem('jwt-token'))
        .catch(e => console.log(e.message))
    },[])

    return (
        <section>
            <div className={`flex justify-center w-full sm:w-[65%] md:w-[60%] lg:w-[40%] mx-auto items-center max-h-screen`}>
                <img src="https://i.ibb.co/PDXxrr1/401-Error-Unauthorized-rafiki-1.png" alt="401 UnAuthorized" />
            </div>
        </section>
    );
};

export default UnAuthorized;