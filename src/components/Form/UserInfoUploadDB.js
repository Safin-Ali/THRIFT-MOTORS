import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthUser } from '../../Context/AuthContext';

const UserInfoUploadDB = (infoData,selRole,from) => {

    // use AuthContext For User Data
    const {updateAuthProfile,signUp,notifySuccess} = useContext(AuthUser);

    // assign new route / change route path using by this hook
    const navigate = useNavigate();

    function generateUserInfo (data) {
              // set user account role
              data['userRole'] = selRole;              
              // conver image file and post image to the imgbb
              const imgFormData = new FormData();
              imgFormData.append('image',data.userAvatar[0])
      
              console.log(data)
      
              // imgbb api connect
              const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API}`
      
              // post user image to imgbb
              axios.post(url,imgFormData)
              .then(res => {
      
                // if image upload successfull then work else
      
                if(res.data.success) {
                  // reassign user image url
                  data.userAvatar = res.data.data.url;
      
                  // concat with user first name + last name
                  const fullName = data.firstName.concat(' ',data.lastName);
      
                  // call firebase signup function
                  signUp(data.userEmail,data.password)
                  
                  .then(res => {
                    updateAuthProfile(fullName,data.userAvatar)
                    .then(res => {})
                    .catch(e => console.log(e.message))
      
                    // post user information to userInfo server
                    axios.post(`https://thrift-motors-server.vercel.app/userinfo`,data)
                      .then(res => {
      
                        // if post successfull then popup toast
                        if(res.data.acknowledged){
                          notifySuccess('Wow Your are signin')
                          return navigate(from)
                        }
                      })
                  })
                  .catch(e => console.log(e.message))
                }
              })
    }

    return generateUserInfo
};

export default UserInfoUploadDB;