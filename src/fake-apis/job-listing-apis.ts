import { FilterType, USER_TYPE } from '../constants';
import {
    getLocalStore,
    fakePromise,
    updateJobsLocalStore,
} from '../utils/fake-apis-utils';

export interface Job {
    id: string;
    companyName: string;
    title: string;
    description: string;
    location: string;
    createdAt: string;
    createdBy: string; // Todo: maps to user
    salaryRange: [number, number];
    tags: Array<string>;
    applicants: Array<string>;
}

const isFilterApplied = (
    job: Job,
    tagsSet: Set<string>,
    minSalary: number
): boolean => {
    let has = false;

    if (
        (tagsSet.size === 0 ||
            job.tags.some((tag) => tagsSet.has(tag.toLowerCase()))) &&
        job.salaryRange[0] >= minSalary
    ) {
        has = true;
    }

    return has;
};

export const getJobs = async (
    userEmail: string = '',
    jobFilter: FilterType
): Promise<any> => {
    const { jobsData, usersData } = getLocalStore();
    const user = usersData.find(({ email }) => email === userEmail);
    const appliedSet = new Set(user?.userDetails.appliedTo);
    const tagsSet = new Set(jobFilter.tags.map((tag) => tag.toLowerCase()));
    const transformedMinSalary = Number.isNaN(parseInt(jobFilter.minSalary, 10))
        ? 0
        : parseInt(jobFilter.minSalary, 10);

    let jobs;
    if (user?.userDetails.type === USER_TYPE.CANDIDATE) {
        jobs = jobsData.filter(
            (job) =>
                !appliedSet.has(job.id) &&
                isFilterApplied(job, tagsSet, transformedMinSalary)
        );
    } else {
        jobs = jobsData.filter(
            (job) =>
                job.createdBy === user?.id &&
                isFilterApplied(job, tagsSet, transformedMinSalary)
        );
    }

    return fakePromise(jobs);
};

export const getJob = async (jobId: string): Promise<any> => {
    return fakePromise();
};

export const createJob = async (jobId: string, payload: Job): Promise<any> => {
    return fakePromise();
};

export const updateJob = async (
    jobId: string,
    userId: string
): Promise<any> => {
    const { jobsData } = getLocalStore();

    for (const index in jobsData) {
        if (jobsData[index].id === jobId) {
            jobsData[index].applicants.push(userId);
        }
    }

    await updateJobsLocalStore(jobsData);

    return fakePromise();
};

export const deleteJob = async (jobId: string): Promise<any> => {
    return fakePromise();
};
