import React from 'react';

const Header = ({header}) => {
    return (
        <div className='mb-4'>
            <h3 className='text-4xl font-bold w-fit mx-auto px-3 border-x-4 border-[#FEFFFF] text-[#17242A]'>{header}</h3>
        </div>
    );
};

export default Header;