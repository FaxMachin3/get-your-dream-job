import { useContext, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Input, Form, Typography, Button, notification } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES, USER_TYPE } from '../../constants';
import { UserContext } from '../../contexts/UserContext';

import './styles.scss';
import { createUser, User } from '../../fake-apis/user-apis';

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
    const location = useLocation();
    const isRecruiter: boolean = location.pathname === ROUTES.RECRUITER_SIGN_UP;
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
    const { currentUser, setCurrentUserAndLocalStorage } =
        useContext(UserContext);
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

    if (currentUser) {
        return <Navigate to={ROUTES.JOB_LISTING} />;
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const getUserDetails = () => {
        if (isRecruiter) {
            return {
                type: USER_TYPE.RECRUITER,
                companyName,
            };
        }

        return {
            type: USER_TYPE.CANDIDATE,
            appliedTo: [],
            skills: [],
            githubUsername,
        };
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (password !== confirmPassword) {
            notification['error']({
                message: '',
                description: 'Passwords do not match.',
                placement: 'bottomRight',
            });
        } else {
            setIsButtonLoading(true);
            const payload: Partial<User> = {
                name,
                email,
                password,
                userDetails: { ...getUserDetails(), location: '' },
            };

            createUser(payload)
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
                    size="large"
                    required
                />
            </Form.Item>
        ) : (
            <Form.Item label="Github Username" name="githubUsername">
                <Input
                    type="text"
                    name="githubUsername"
                    placeholder="Your GitHub username"
                    value={githubUsername}
                    size="large"
                    onChange={onChange}
                />
            </Form.Item>
        );

    return (
        <div className="sign-up-wrapper">
            <section className="sign-up-content">
                <Typography.Title className="title">Sign Up</Typography.Title>
                <Form
                    name="sign-up"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onSubmit}
                    autoComplete="on"
                >
                    <Form.Item label="Name" name="name">
                        <Input
                            type="text"
                            name="name"
                            placeholder="e.g. John Doe"
                            value={name}
                            onChange={onChange}
                            size="large"
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
                            size="large"
                            required
                        />
                    </Form.Item>
                    {renderUserSpecificInputs()}
                    <Form.Item label="Password" name="password">
                        <Input.Password
                            type="password"
                            className="password-input"
                            name="password"
                            placeholder="Set a password"
                            minLength={6}
                            value={password}
                            onChange={onChange}
                            size="large"
                            required
                        />
                    </Form.Item>
                    <Form.Item label="Confirm Password" name="confirmPassword">
                        <Input.Password
                            type="password"
                            className="password-input"
                            name="confirmPassword"
                            placeholder="Retype to confirm"
                            minLength={6}
                            value={confirmPassword}
                            onChange={onChange}
                            size="large"
                            required
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
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
        </div>
    );
};

export default SignUp;
