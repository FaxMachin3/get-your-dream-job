import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import Navbar from '../navbar';

interface ErrorProps {}

const Error: React.FC<ErrorProps> = () => {
    const navigate = useNavigate();

    const backToHome = () => {
        navigate(ROUTES.ROOT);
    };

    return (
        <>
            <Navbar />
            <div className="error-content">
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={
                        <Button type="primary" onClick={backToHome}>
                            Back Home
                        </Button>
                    }
                />
            </div>
        </>
    );
};

export default Error;
