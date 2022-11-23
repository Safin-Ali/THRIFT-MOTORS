import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import Navbar from '../../components/Navbar/Navbar';

const Home = () => {
    return (
        <>
            <header className={`py-10`}>
                {/* Carousel Banner */}
                <div>
                    <Carousel></Carousel>
                </div>
            </header>
        </>
    );
};

export default Home;