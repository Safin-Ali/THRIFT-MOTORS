import axios from "axios";


const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API}`

export async function generateImgURL (imgByte) {
    try{
        const formatImg = await new FormData();
        formatImg.append('image',imgByte[0])
        const res = await axios.post(url,formatImg)
        return res.data.data.url
    }
    catch(e){
        console.log(e.message)
    }
}