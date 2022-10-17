import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import './styles.scss';

interface LoaderProps {}

const LoadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loader: React.FC<LoaderProps> = () => {
    return (
        <div className="loader-wrapper">
            <Spin indicator={LoadingIcon} />
        </div>
    );
};

export default Loader;
