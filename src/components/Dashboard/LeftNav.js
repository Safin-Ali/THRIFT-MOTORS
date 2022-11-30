import React from 'react';

const LeftNav = ({children,className=''}) => {
    return (
        <aside className={`${className} min-h-screen`}>
            {
                children
            }
        </aside>
    );
};

export default LeftNav;