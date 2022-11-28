import axios from "axios"


export async function generateJWT (email) {
            const res = await axios.get(`http://localhost:5000/jwt?email=${email}`)
            return localStorage.setItem('jwt-token',res.data.encryptToken)
          }