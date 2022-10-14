import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Input, Form, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

import './styles.scss';

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
    const location = useLocation();
    const isRecruiter: boolean = location.pathname === ROUTES.RECRUITER_SIGN_UP;
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        githubUsername: '',
    });

    const {
        name,
        email,
        password,
        confirmPassword,
        githubUsername,
        companyName,
    } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsButtonLoading(true);
        if (password !== confirmPassword) {
            // setAlert('Passwords do not match.', 'danger', 3000);
        } else {
            // register({
            //     name,
            //     email,
            //     password,
            // });
        }
    };

    const renderUserSpecificInputs = () =>
        isRecruiter ? (
            <Form.Item label="Your Company Name" name="companyName">
                <Input
                    type="text"
                    name="companyName"
                    placeholder="e.g. Intuit or Zerodha"
                    value={companyName}
                    onChange={onChange}
                    required
                />
            </Form.Item>
        ) : (
            <Form.Item label="Github Username" name="githubUsername">
                <Input
                    type="text"
                    name="githubUsername"
                    placeholder="If you want your latest repos and a Github link, include your username"
                    value={githubUsername}
                    onChange={onChange}
                />
            </Form.Item>
        );

    return (
        <section className="sign-up">
            <Typography.Title className="title">Sign Up</Typography.Title>
            <Typography.Paragraph>
                <i className="fas fa-user"></i> Create Your Account
            </Typography.Paragraph>
            <Form
                name="sign-up"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                autoComplete="off"
            >
                <Form.Item label="Name" name="name">
                    <Input
                        type="text"
                        name="name"
                        placeholder="e.g. John Doe"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </Form.Item>
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
                {renderUserSpecificInputs()}
                <Form.Item label="Password" name="password">
                    <Input.Password
                        type="password"
                        name="password"
                        placeholder="Set a password"
                        minLength={6}
                        value={password}
                        onChange={onChange}
                        required
                    />
                </Form.Item>
                <Form.Item label="Confirm Password" name="confirmPassword">
                    <Input.Password
                        type="password"
                        name="confirmPassword"
                        placeholder="Retype to confirm"
                        minLength={6}
                        value={confirmPassword}
                        onChange={onChange}
                        required
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isButtonLoading}
                    >
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
            <div className="sign-up-footer">
                <Typography.Paragraph>
                    Already have an account?{' '}
                    <Link to={ROUTES.LOGIN}>Login</Link>
                </Typography.Paragraph>
                <Typography.Paragraph>
                    <Link
                        to={
                            isRecruiter
                                ? ROUTES.CANDIDATE_SIGN_UP
                                : ROUTES.RECRUITER_SIGN_UP
                        }
                    >
                        {isRecruiter
                            ? 'Candidate Sign-up'
                            : 'Recruiter Sign-up'}
                    </Link>
                </Typography.Paragraph>
            </div>
        </section>
    );
};

export default SignUp;
