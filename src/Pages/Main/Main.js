import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const Main = () => {

    function darkTheme () {
        document.body.classList.add('dark-theme')
    }

    return (
        <section>
            <Navbar></Navbar>
            <main>
                <Outlet></Outlet>
            </main>
        </section>
    );
};

export default Main;