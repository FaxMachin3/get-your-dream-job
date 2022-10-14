import React from 'react';
import Navbar from '../navbar';

interface ErrorProps {}

const Error: React.FC<ErrorProps> = () => {
    return (
        <>
            <Navbar />
            <div>Error</div>
        </>
    );
};

export default Error;
