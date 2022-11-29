import axios from "axios"


export async function generateJWT (email) {
            const res = await axios.get(`https://thrift-motors-server.vercel.app/jwt?email=${email}`)
            return localStorage.setItem('jwt-token',res.data.encryptToken)
          }