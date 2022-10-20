import React, { useContext, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, notification, Pagination, Skeleton, Typography } from 'antd';
import { FilterType, ROUTES, _TOTAL_JOBS, _PAGE_SIZE } from '../../constants';
import { UserContext } from '../../contexts/UserContext';
import { getJobs, Job } from '../../fake-apis/job-listing-apis';
import Sidebar from '../sidebar';
import Jobs from '../jobs';

import './styles.scss';

interface JobListingProps {}

const JobListing: React.FC<JobListingProps> = () => {
    const dummyTop = useRef<HTMLAnchorElement>(null);
    const { currentUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [jobs, setJobs] = useState<Array<Job>>([]);
    const [initialFetching, setInitialFetching] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(_PAGE_SIZE);
    const [totalJobs, setTotalJobs] = useState<number>(_TOTAL_JOBS);
    const [reRenderCount, setReRenderCount] = useState<number>(0);

    const getJobsForUser = (
        jobFilter: FilterType = {
            tags: [],
            minSalary: '',
        }
    ) => {
        setIsLoading(true);
        currentUser &&
            getJobs(currentUser.email, jobFilter, {
                pageSize,
                offset: offset - 1,
            })
                .then((data) => {
                    setTotalJobs(data.totalJobs);
                    delete data.totalJobs;
                    setJobs(data.jobs);
                    setIsLoading(false);
                    setInitialFetching(false);
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
        setOffset(1);
    }, [reRenderCount]);

    useEffect(() => {
        getJobsForUser();
    }, [currentUser, offset, pageSize, reRenderCount]);

    if (!currentUser) {
        return <Navigate to={ROUTES.LOGIN} />;
    }

    const renderJobs = () => {
        if (isLoading) return <Skeleton active />;

        if (!initialFetching && jobs.length === 0) {
            return (
                <Typography.Paragraph className="no-jobs">
                    Sorry! No jobs available currently.{' '}
                    {offset > 1 ? (
                        <a onClick={() => setOffset(1)}>Please click here.</a>
                    ) : (
                        ''
                    )}
                </Typography.Paragraph>
            );
        }

        return (
            <div className="jobs-wrapper">
                <Jobs data={jobs} />
                {totalJobs / pageSize > 1 ? (
                    <Pagination
                        className="pagination-container"
                        total={totalJobs}
                        defaultCurrent={offset}
                        showSizeChanger={false}
                        showQuickJumper
                        onChange={onPageChange}
                    />
                ) : null}
                <a ref={dummyTop} href="#navbar"></a>
            </div>
        );
    };

    const onPageChange = (page: number, pageSize: number) => {
        setOffset(page);
        // move to navbar
        dummyTop.current?.click();
    };

    return (
        <section className="job-listing-wrapper">
            <Sidebar getJobsForUser={getJobsForUser} />
            {renderJobs()}
        </section>
    );
};

export default JobListing;
