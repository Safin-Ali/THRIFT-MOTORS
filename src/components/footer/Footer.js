import React from 'react';
import {FaFacebook, FaGithub, FaTwitter} from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className={`p-10 border drop-shadow-lg text-center`}>
                <h4 className={`text-3xl my-3`}>THRIFT MOTOTRS</h4>
                <div className={`flex gap-x-3 justify-center`}>
                    <FaFacebook className={`text-2xl`}></FaFacebook>
                    <FaGithub className={`text-2xl`}></FaGithub>
                    <FaTwitter className={`text-2xl`}></FaTwitter>
                </div>
        </footer>
    );
};

export default Footer;