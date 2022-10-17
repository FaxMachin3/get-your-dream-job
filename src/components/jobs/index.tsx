import React, { useContext, useState } from 'react';
import {
    Avatar,
    Button,
    Card,
    notification,
    Typography,
    Modal,
    List,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Job, updateJob } from '../../fake-apis/job-listing-apis';

import './styles.scss';
import { ERROR, SUCCESS } from '../../utils/fake-apis-utils';
import { updateUser, User } from '../../fake-apis/user-apis';
import { UserContext } from '../../contexts/UserContext';
import { USER_TYPE } from '../../constants';

interface JobsProps {
    data: Array<Job>;
}

const Jobs: React.FC<JobsProps> = ({ data }) => {
    const { currentUser, setCurrentUserAndLocalStorage } =
        useContext(UserContext);
    const isRecruiter = currentUser?.userDetails.type === USER_TYPE.RECRUITER;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onApplyClickHandler = async (
        e: React.MouseEvent<HTMLButtonElement>,
        jobId: string
    ) => {
        e.stopPropagation();

        const newPayload = {
            ...currentUser,
            userDetails: {
                ...currentUser?.userDetails,
                appliedTo: [
                    ...(currentUser?.userDetails.appliedTo as []),
                    jobId,
                ],
            },
        };

        setCurrentUserAndLocalStorage?.(newPayload as User);

        if (currentUser) {
            try {
                await updateUser(currentUser.email, newPayload as User);
                await updateJob(jobId, currentUser.id);

                notification['success']({
                    message: '',
                    description: SUCCESS.JOB_APPLIED,
                    placement: 'bottomRight',
                });
            } catch (error) {}
        }
    };

    const onNotInterestedClickHandler = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation();
        notification['info']({
            message: '',
            description: ERROR.FEATURE_INCOMING,
            placement: 'bottomRight',
        });
    };

    return (
        <>
            <main className="job-listing">
                {data.map(
                    ({
                        id: jobId,
                        companyName,
                        location,
                        description,
                        title,
                        applicants,
                    }) => {
                        return (
                            <Card
                                className="job-card"
                                key={jobId}
                                hoverable
                                onClick={openModal}
                            >
                                <div
                                    className={`content ${
                                        !isRecruiter ? 'content-candidate' : ''
                                    }`}
                                >
                                    <div className="logo">
                                        <Avatar
                                            size="large"
                                            className="logo-image"
                                            icon={<UserOutlined />}
                                        />
                                    </div>
                                    <div className="job-details">
                                        <Typography.Paragraph className="title">
                                            {companyName} - {title}
                                            {isRecruiter &&
                                            applicants.length > 0 ? (
                                                <Typography.Text className="applicants">
                                                    [{applicants.length}{' '}
                                                    applicant
                                                    {applicants.length > 1
                                                        ? 's'
                                                        : ''}
                                                    ]
                                                </Typography.Text>
                                            ) : null}
                                        </Typography.Paragraph>
                                        <Typography.Paragraph italic>
                                            Job available in {location}
                                        </Typography.Paragraph>
                                        <Typography.Paragraph
                                            ellipsis={{
                                                expandable: false,
                                                rows: 2,
                                            }}
                                        >
                                            {description}
                                        </Typography.Paragraph>
                                    </div>
                                </div>
                                {!isRecruiter ? (
                                    <div className="action-center">
                                        <Button
                                            type="primary"
                                            size="large"
                                            onClick={(e: any) =>
                                                onApplyClickHandler(e, jobId)
                                            }
                                        >
                                            Apply
                                        </Button>
                                        {/* Todo */}
                                        <Button
                                            type="link"
                                            size="large"
                                            onClick={
                                                onNotInterestedClickHandler
                                            }
                                        >
                                            Not interested
                                        </Button>
                                    </div>
                                ) : null}
                            </Card>
                        );
                    }
                )}
            </main>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {/* Todo */}
                {ERROR.FEATURE_INCOMING}
            </Modal>
        </>
    );
};

export default Jobs;
