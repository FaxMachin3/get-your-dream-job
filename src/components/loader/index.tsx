import React from 'react';
import { Spin } from 'antd';

import './styles.scss';

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
    return (
        <div className="loader-wrapper">
            <Spin />
        </div>
    );
};

export default Loader;
