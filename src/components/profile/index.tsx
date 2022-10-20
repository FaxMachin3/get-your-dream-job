import {
    Avatar,
    Button,
    Card,
    Empty,
    Modal,
    notification,
    Skeleton,
    Tag,
    Typography,
} from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES, USER_TYPE } from '../../constants';
import { UserContext } from '../../contexts/UserContext';
import { UserOutlined } from '@ant-design/icons';
import {
    getUserGitHubRepos,
    updateUser,
    User,
} from '../../fake-apis/user-apis';

import './styles.scss';
import EditJob from '../edit-profile';
import { ERROR, SUCCESS } from '../../utils/fake-apis-utils';
import { validateEmail } from '../../utils/common';
import { getAppliedJobs, Job } from '../../fake-apis/job-listing-apis';
import Jobs from '../jobs';

interface ProfileProps {
    applicant?: User;
}

const Profile: React.FC<ProfileProps> = ({ applicant }) => {
    const { currentUser, setCurrentUserAndLocalStorage } =
        useContext(UserContext);
    const currentUserProfile = applicant ?? currentUser;
    const isRecruiter =
        currentUserProfile?.userDetails.type === USER_TYPE.RECRUITER;
    const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
    const [gitHubRepos, setGitHubRepos] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
    const [initialFetching, setInitialFetching] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [initialJobsFetching, setInitialJobsFetching] = useState(true);
    const [isJobsLoading, setIsJobsLoading] = useState(true);
    const [isOkLoading, setIsOkLoading] = useState(false);
    const [editProfileFormData, setEditProfileFormData] = useState<
        Partial<User & { confirmPassword: string }>
    >({
        name: currentUserProfile?.name,
        email: currentUserProfile?.email,
        password: '',
        confirmPassword: '',
        userDetails: {
            type: currentUserProfile?.userDetails.type as USER_TYPE,
            contact: currentUserProfile?.userDetails.contact ?? '',
            location: currentUserProfile?.userDetails.location ?? '',
            githubUsername:
                currentUserProfile?.userDetails.githubUsername ?? '',
            skills: currentUserProfile?.userDetails.skills ?? [],
            appliedTo: currentUserProfile?.userDetails.appliedTo ?? [],
            companyName: currentUserProfile?.userDetails.companyName ?? '',
        },
    });

    useEffect(() => {
        if (!isRecruiter) {
            getUserGitHubRepos(
                currentUserProfile?.userDetails?.githubUsername as any
            )
                .then((data) => {
                    setGitHubRepos(data);
                    setInitialFetching(false);
                    setIsLoading(false);
                })
                .catch(() => {
                    setGitHubRepos([]);
                    setInitialFetching(false);
                    setIsLoading(false);
                });

            getAppliedJobs(
                currentUserProfile?.userDetails?.appliedTo as string[]
            )
                .then((data) => {
                    setAppliedJobs(data);
                    setInitialJobsFetching(false);
                    setIsJobsLoading(false);
                })
                .catch(() => {
                    setAppliedJobs([]);
                    setInitialJobsFetching(false);
                    setIsJobsLoading(false);
                });
        }
    }, [
        currentUserProfile?.userDetails?.githubUsername,
        currentUserProfile?.userDetails?.appliedTo,
        isRecruiter,
    ]);

    if (!currentUserProfile) {
        return <Navigate to={ROUTES.LOGIN} />;
    }

    const renderJobs = () => {
        if (isJobsLoading) {
            return <Skeleton active />;
        }

        if (!initialJobsFetching && appliedJobs.length === 0) {
            return (
                <div key="no-repo" className="no-repo">
                    <Empty description="No jobs applied!" />
                </div>
            );
        }

        return (
            <>
                <Typography.Paragraph strong className="applied-jobs-title">
                    Applied Jobs
                </Typography.Paragraph>
                <Jobs data={appliedJobs} />
            </>
        );
    };

    const renderSkills = () => {
        if (currentUserProfile.userDetails.skills?.length === 0) {
            return null;
        }

        return (
            <Typography.Paragraph>
                {currentUserProfile.userDetails.skills?.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                ))}
            </Typography.Paragraph>
        );
    };

    const renderRepos = () => {
        if (isLoading) {
            return <Skeleton active />;
        }

        if (!initialFetching && gitHubRepos.length === 0) {
            return (
                <div key="no-repo" className="no-repo">
                    <Empty description="No GitHub profile/ repo found." />
                </div>
            );
        }

        return (
            <div>
                <Typography.Paragraph strong className="github-repos-title">
                    GitHub Repos
                </Typography.Paragraph>
                {gitHubRepos.map((repo: any) => (
                    <Card
                        key={repo.id}
                        className="git-card"
                        hoverable
                        onClick={() => window.open(repo.html_url)}
                        bordered={false}
                    >
                        <div className="left">
                            <Typography.Paragraph
                                className="link"
                                strong
                                ellipsis
                            >
                                {repo.name}
                            </Typography.Paragraph>
                            {repo.description ? (
                                <Typography.Paragraph className="repo-description">
                                    {repo.description}
                                </Typography.Paragraph>
                            ) : null}
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
                    </Card>
                ))}
            </div>
        );
    };

    const editProfileHandler = () => {
        setOpenEditProfileModal(true);
    };

    const createJobHandler = () => {
        if (!validateEmail(editProfileFormData.email as string)) {
            notification['error']({
                message: '',
                description: ERROR.INVALID_EMAIL,
                placement: 'topRight',
            });
            return;
        }

        if (!editProfileFormData.name || !editProfileFormData.email) {
            notification['error']({
                message: '',
                description: ERROR.CHECK_FORM_DATA,
                placement: 'topRight',
            });
            return;
        }

        if (
            editProfileFormData.password !== editProfileFormData.confirmPassword
        ) {
            notification['error']({
                message: '',
                description: ERROR.PASSWORD_MISMATCH,
                placement: 'topRight',
            });
            return;
        }

        setIsOkLoading(true);

        const payload = {
            ...editProfileFormData,
        };

        delete payload.confirmPassword;
        if (!payload.password) delete payload.password;

        updateUser(currentUserProfile.email, payload)
            .then(() => {
                setOpenEditProfileModal(false);
                setIsOkLoading(false);
                setCurrentUserAndLocalStorage?.({
                    ...payload,
                    id: currentUserProfile.id,
                } as User);
                notification['info']({
                    message: '',
                    description: SUCCESS.PROFILE_SAVED,
                    placement: 'bottomRight',
                });
            })
            .catch(() => {
                setOpenEditProfileModal(false);
                setIsOkLoading(false);
            });
    };

    const cancelHandler = () => {
        setOpenEditProfileModal(false);
    };

    return (
        <div className="profile-wrapper">
            <Card className="profile-details-top profile-card" bordered={false}>
                <div>
                    <div className="avatar-container">
                        <Avatar
                            size="large"
                            className="avatar"
                            icon={<UserOutlined size={120} />}
                        />
                    </div>
                    <Typography.Title className="title">
                        {currentUserProfile.name}
                    </Typography.Title>
                    {!applicant ? (
                        <Button
                            type="link"
                            className="edit-profile"
                            onClick={editProfileHandler}
                        >
                            Edit profile
                        </Button>
                    ) : null}
                    <Modal
                        className="edit-profile-modal"
                        open={openEditProfileModal}
                        onOk={createJobHandler}
                        onCancel={cancelHandler}
                        okText="Save"
                        cancelButtonProps={{
                            size: 'large',
                            className: 'cancel-button',
                        }}
                        okButtonProps={{
                            loading: isOkLoading,
                            size: 'large',
                            className: 'create-button',
                        }}
                    >
                        <EditJob
                            editProfileFormData={editProfileFormData}
                            setEditProfileFormData={setEditProfileFormData}
                        />
                    </Modal>
                </div>
                <Typography.Paragraph>
                    {currentUserProfile.email}
                </Typography.Paragraph>
                {currentUserProfile.userDetails.contact ? (
                    <Typography.Paragraph>
                        {currentUserProfile.userDetails.contact}
                    </Typography.Paragraph>
                ) : null}
                {currentUserProfile.userDetails.location ? (
                    <Typography.Paragraph>
                        {currentUserProfile.userDetails.location}
                    </Typography.Paragraph>
                ) : null}
                {currentUserProfile.userDetails.companyName ? (
                    <Typography.Paragraph>
                        {currentUserProfile.userDetails.companyName}
                    </Typography.Paragraph>
                ) : null}
                {renderSkills()}
            </Card>
            {!isRecruiter && !applicant ? (
                <Card className="applied-jobs profile-card" bordered={false}>
                    {renderJobs()}
                </Card>
            ) : null}
            {!isRecruiter ? (
                <Card className="github-repos profile-card" bordered={false}>
                    {renderRepos()}
                </Card>
            ) : null}
        </div>
    );
};

export default Profile;
