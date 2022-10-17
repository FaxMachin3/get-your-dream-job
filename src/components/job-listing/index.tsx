import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { notification, Skeleton, Typography } from 'antd';
import { FilterType, ROUTES } from '../../constants';
import { UserContext } from '../../contexts/UserContext';
import { getJobs, Job } from '../../fake-apis/job-listing-apis';
import Sidebar from '../sidebar';
import Jobs from '../jobs';
import Loader from '../loader';

import './styles.scss';

interface JobListingProps {}

const JobListing: React.FC<JobListingProps> = () => {
    const { currentUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [jobs, setJobs] = useState<Array<Job>>([]);
    const [initialFetching, setIntialFetching] = useState<boolean>(true);

    const getJobsForUser = (
        jobFilter: FilterType = {
            tags: [],
            minSalary: '',
        }
    ) => {
        setIsLoading(true);
        currentUser &&
            getJobs(currentUser.email, jobFilter)
                .then((data) => {
                    setJobs(data);
                    setIsLoading(false);
                    setIntialFetching(false);
                })
                .catch((errorMessage) => {
                    setIsLoading(false);
                    setJobs([]);
                    notification['error']({
                        message: '',
                        description: errorMessage,
                        placement: 'bottomRight',
                    });
                });
    };

    useEffect(() => {
        getJobsForUser();
    }, [currentUser]);

    if (!currentUser) {
        return <Navigate to={ROUTES.LOGIN} />;
    }

    const renderJobs = () => {
        if (isLoading) return <Skeleton active />;

        if (!initialFetching && jobs.length === 0) {
            return (
                <Typography.Paragraph className="no-jobs">
                    Sorry! No jobs available currently.
                </Typography.Paragraph>
            );
        }

        return (
            <>
                <Jobs data={jobs} />
            </>
        );
    };

    return (
        <section className="job-listing-wrapper">
            <Sidebar getJobsForUser={getJobsForUser} />
            {renderJobs()}
        </section>
    );
};

export default JobListing;
