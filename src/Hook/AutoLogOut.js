import { useContext } from 'react';
import { AuthUser } from '../Context/AuthContext';

const AutoLogOut = () => {
    const {logOut} = useContext(AuthUser);
    logOut()
    .then(() => localStorage.removeItem('jwt-token'))
    .catch(e => console.log(e.message))
    return
};

export default AutoLogOut;