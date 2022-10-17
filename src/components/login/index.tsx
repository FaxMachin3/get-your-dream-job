import { useContext, useState } from 'react';
import { Input, Button, Typography, Form, notification } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { getUser } from '../../fake-apis/user-apis';
import { UserContext } from '../../contexts/UserContext';

import './styles.scss';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
    const { currentUser, setCurrentUserAndLocalStorage } =
        useContext(UserContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

    if (currentUser) {
        return <Navigate to={ROUTES.JOB_LISTING} />;
    }

    const { email, password } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsButtonLoading(true);

        getUser(email, password)
            .then((currentUser) => {
                setCurrentUserAndLocalStorage?.(currentUser);
                // navigate(ROUTES.JOB_LISTING);
            })
            .catch((errorMessage) => {
                setIsButtonLoading(false);
                notification['error']({
                    message: '',
                    description: errorMessage,
                    placement: 'bottomRight',
                });
            });
    };

    return (
        <div className="login-wrapper">
            <section className="login-content">
                <Typography.Title className="title">Login</Typography.Title>
                <Form
                    name="login"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onSubmit}
                    autoComplete="on"
                >
                    <Form.Item label="Email" name="email">
                        <Input
                            type="email"
                            name="email"
                            placeholder="e.g. john.doe@xyz.com"
                            value={email}
                            onChange={onChange}
                            size="large"
                            required
                        />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input.Password
                            type="password"
                            className="password-input"
                            name="password"
                            placeholder="e.g. not your phone number"
                            minLength={6}
                            value={password}
                            onChange={onChange}
                            size="large"
                            required
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            loading={isButtonLoading}
                            size="large"
                            htmlType="submit"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <Typography.Paragraph>
                    Don't have an account?{' '}
                    <Link to={ROUTES.CANDIDATE_SIGN_UP}>Sign-up</Link>
                </Typography.Paragraph>
            </section>
        </div>
    );
};

export default Login;
