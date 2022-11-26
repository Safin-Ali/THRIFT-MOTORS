import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Carousel = ({url,imgArray,className=''}) => {

    // store image array
    const [apiImageArray,setAPIImageArray] = useState(null);

    // slide direction
    const[dirBool,setDirBool] = useState(false)

    // base count number
    const[count,setCount] = useState(0);
    
    // set common class everyslide items
    function slide () {
        const selCaroselItems = document.getElementsByName('carousel-items');
        selCaroselItems.forEach(elm => {
            const active = `
            transform: translateX(-${count * 100}%);
            transition: all 0.5s linear;
        `;
        elm.style = active
        })
    }

    // slide animation
    function changeStatePlus () {
        if(dirBool) {
            slide()
            if(count === 0) {
                return setDirBool(false)
            }
            return setCount(count-1)
        }
            slide()
            if(count === apiImageArray?.banner.length-1) {
                return setDirBool(true)
            }
            setCount(count+1)
    }

    // promises function
    function run () {
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(changeStatePlus())
            },2000)
        })
    }

    // call when direction state and count number change
    useEffect(()=>{
        run()
    },[count,dirBool])

    // call api for image array
    function Fetching (apiURL) {
        useEffect(()=>{
            axios.get(apiURL)
            .then(res => setAPIImageArray(res.data))
            .catch(e => console.log(e.message))
        },[])
        }
    
    // images design array
    if(url){
        Fetching(url);                
        return (
            <>
                <section className={`flex`}>
                    <div className={`mx-auto ${className} border-2 rounded-lg overflow-hidden relative flex `}>
                        {
                            apiImageArray?.banner.map((img,idx)=> <img key={idx} style={{left: `${idx*100}%`}} name={`carousel-items`} src={img} alt="Slide_Image" className={`rounded-lg w-full`}  />)
                        }
                    </div>
                </section>
            </>
        );
    }
};

export default Carousel;