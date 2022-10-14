import { useState } from 'react';
import { Input, Button, Typography, Form } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

import './styles.scss';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

    const { email, password } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsButtonLoading(true);
        // login(email, password);
    };

    return (
        <section className="login-wrapper">
            <Typography.Title className="title">Login</Typography.Title>
            <Typography.Paragraph>
                <i className="fas fa-user"></i> Login Into Your Account
            </Typography.Paragraph>
            <Form
                name="login"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                autoComplete="off"
            >
                <Form.Item label="Email" name="email">
                    <Input
                        type="email"
                        name="email"
                        placeholder="e.g. john.doe@xyz.com"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input.Password
                        type="password"
                        name="password"
                        placeholder="e.g. not your phone number"
                        minLength={6}
                        value={password}
                        onChange={onChange}
                        required
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        loading={isButtonLoading}
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
    );
};

export default Login;
