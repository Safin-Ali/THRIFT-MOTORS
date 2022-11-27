import React from 'react';

const LeftNav = ({children,className=''}) => {
    return (
        <aside className={`${className}`}>
            {
                children
            }
        </aside>
    );
};

export default LeftNav;