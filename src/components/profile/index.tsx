import { Avatar, List, notification, Skeleton, Tag, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { UserContext } from '../../contexts/UserContext';
import { UserOutlined } from '@ant-design/icons';
import { getUserGitHubRepos } from '../../fake-apis/user-apis';

import './styles.scss';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
    const { currentUser } = useContext(UserContext);
    const [gitHudRepos, setGitHubRepos] = useState([]);
    const [initialFetching, setInitialFetching] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (
            getUserGitHubRepos(
                currentUser?.userDetails?.githubUsername as any
            ) as Promise<any>
        )
            .then((data) => {
                setGitHubRepos(data);
                setInitialFetching(false);
                setIsLoading(false);
            })
            .catch((errorMessage) => {
                setInitialFetching(false);
                setIsLoading(false);
                notification['error']({
                    message: '',
                    description: errorMessage,
                    placement: 'bottomRight',
                });
            });
    }, []);

    if (!currentUser) {
        return <Navigate to={ROUTES.LOGIN} />;
    }

    const renderRepos = () => {
        if (isLoading) {
            return <Skeleton active />;
        }

        if (!initialFetching && gitHudRepos.length === 0) {
            return (
                <List.Item className="no-repo">
                    Please add GitHub profile form the edit profile sections.
                </List.Item>
            );
        }

        return gitHudRepos.map((repo: any) => (
            <List.Item key={repo.id}>
                <div className="left">
                    <Typography.Paragraph>{repo.name}</Typography.Paragraph>
                    <Typography.Paragraph>
                        {repo.description}
                    </Typography.Paragraph>
                </div>
                <div className="right">
                    <Typography.Paragraph>
                        <Tag>Stars: {repo.stargazers_count}</Tag>
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        <Tag>Watchers: {repo.watchers_count}</Tag>
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        <Tag>Forks: {repo.forks_count}</Tag>
                    </Typography.Paragraph>
                </div>
            </List.Item>
        ));
    };

    return (
        <div>
            <div>
                <Avatar
                    size="large"
                    className="logo-image"
                    icon={<UserOutlined />}
                />
                <Typography.Title>{currentUser.name}</Typography.Title>
                <Typography.Paragraph>{currentUser.email}</Typography.Paragraph>
            </div>
            <List className="github-repos">{renderRepos()}</List>
        </div>
    );
};

export default Profile;
