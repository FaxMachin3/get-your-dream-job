import { Button, Card, Input, Modal, notification, Typography } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FilterType, USER_TYPE } from '../../constants';
import { UserContext } from '../../contexts/UserContext';
import CreateJob from '../create-job';
import TagSelect from '../tag-select';
import { createJob, Job } from '../../fake-apis/job-listing-apis';
// import { debounce } from '../../utils/common';

import './styles.scss';
import { ERROR, SUCCESS } from '../../utils/fake-apis-utils';

interface FilterProps {
    getJobsForUser: (jobFilter?: FilterType) => void;
}

const Filter: React.FC<FilterProps> = ({ getJobsForUser }) => {
    const { currentUser } = useContext(UserContext);
    const [openCreateJobModal, setOpenCreateJobModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isRecruiter = currentUser?.userDetails.type === USER_TYPE.RECRUITER;
    const timer = useRef<NodeJS.Timeout | null>(null);
    const [filter, setFilter] = useState<FilterType>({
        tags: [],
        minSalary: '',
    });
    const [jobFormData, setJobFormData] = useState<Partial<Job>>({
        companyName: currentUser?.userDetails.companyName ?? '',
        title: '',
        contact: currentUser?.userDetails.contact ?? '',
        description: '',
        requirement: '',
        location: '',
        createdBy: currentUser?.id,
        salaryRange: [0, Number.MAX_SAFE_INTEGER],
        tags: [],
    });

    useEffect(() => {
        clearTimeout(timer.current as NodeJS.Timeout);
        timer.current = setTimeout(() => {
            getJobsForUser(filter);
        }, 150);
    }, [filter]);

    const onMinSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            minSalary: e.target.value,
        }));
    };

    const onTagChange = (value: string[]) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            tags: value,
        }));
    };

    const createJobHandler = () => {
        if (
            !jobFormData.companyName ||
            !jobFormData.title ||
            !jobFormData.description ||
            !jobFormData.requirement ||
            !jobFormData.location
        ) {
            notification['error']({
                message: '',
                description: ERROR.CHECK_FORM_DATA,
                placement: 'topRight',
            });
            return;
        }

        setIsLoading(true);
        createJob(jobFormData)
            .then(() => {
                setOpenCreateJobModal(false);
                setIsLoading(false);
                getJobsForUser(filter);
                notification['info']({
                    message: '',
                    description: SUCCESS.JOB_CREATED,
                    placement: 'bottomRight',
                });
            })
            .catch(() => {
                setOpenCreateJobModal(false);
                setIsLoading(false);
            });
    };

    const cancelHandler = () => {
        setOpenCreateJobModal(false);
    };

    return (
        <>
            {isRecruiter ? (
                <div className="create-job">
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => setOpenCreateJobModal(true)}
                    >
                        Create new job posting
                    </Button>
                    <Modal
                        className="create-job-modal"
                        open={openCreateJobModal}
                        onOk={createJobHandler}
                        onCancel={cancelHandler}
                        okText="Create"
                        cancelButtonProps={{
                            size: 'large',
                            className: 'cancel-button',
                        }}
                        okButtonProps={{
                            loading: isLoading,
                            size: 'large',
                            className: 'create-button',
                        }}
                    >
                        <CreateJob
                            jobFormData={jobFormData}
                            setJobFormData={setJobFormData}
                        />
                    </Modal>
                </div>
            ) : null}
            <Card className="filter-container" bordered={false}>
                <Typography.Paragraph className="filter-title" strong>
                    Filter
                </Typography.Paragraph>
                <TagSelect onTagChange={onTagChange} />
                <label>
                    <Typography.Paragraph>Minimum Salary</Typography.Paragraph>
                    <Input
                        placeholder="e.g. 1500000"
                        value={filter.minSalary}
                        name="minSalary"
                        onChange={onMinSalaryChange}
                        className="min-salary-input"
                        type="number"
                        size="large"
                    />
                </label>
            </Card>
        </>
    );
};

export default Filter;
