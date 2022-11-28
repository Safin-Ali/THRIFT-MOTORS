import React from 'react';
import {FaFacebook, FaGithub, FaTwitter} from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className={`p-5 border drop-shadow-lg text-center`}>
                <h4 className={`text-3xl my-3 font-bold`}> <span className={`text-common`}>THRIFT</span> <span className={`text-primaryRed`}>MOTOTRS</span></h4>
                <div className={`flex gap-x-3 justify-center`}>
                    <a href="https://www.facebook.com/safin.ali.55" target={'_blank'}><FaFacebook className={`text-3xl text-blue-700 cursor-pointer`}></FaFacebook></a>
                    <FaGithub className={`text-3xl text-neutral-900`}></FaGithub>
                    <FaTwitter className={`text-3xl text-sky-500`}></FaTwitter>
                </div>
        </footer>
    );
};

export default Footer;