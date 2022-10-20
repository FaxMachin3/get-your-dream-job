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
    contact: string;
    description: string;
    requirement: string;
    location: string;
    createdAt: Date;
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

export const getAppliedJobs = (appliedTo: string[]): Promise<Job[]> => {
    const appliedSet = new Set(appliedTo);
    const { jobsData } = getLocalStore();

    const appliedJobs = jobsData.filter(({ id }) => appliedSet.has(id));
    return fakePromise(appliedJobs) as Promise<Job[]>;
};

export const getJobs = async (
    userEmail: string = '',
    jobFilter: FilterType,
    paginated: { pageSize: number; offset: number } = {
        pageSize: 10,
        offset: 0,
    }
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

    const totalJobs = jobs.length;
    // console.log({ totalJobs });
    const start = paginated.offset * paginated.pageSize;
    const slicedJobs = jobs.slice(start, start + paginated.pageSize);
    // console.log({ slicedJobs });

    return fakePromise({ jobs: slicedJobs, totalJobs });
};

export const getJob = async (jobId: string): Promise<any> => {
    return fakePromise();
};

export const createJob = async (payload: Partial<Job>): Promise<any> => {
    const { jobsData } = getLocalStore();
    const id = `J-${10000 + jobsData.length + 1}`;
    const newJob: Job = {
        ...payload,
        id,
        createdAt: new Date(),
        applicants: [],
    } as Job;

    // jobsData.push(newJob);
    jobsData.unshift(newJob); // O(n) operation

    await updateJobsLocalStore(jobsData);

    return fakePromise();
};

export const updateJob = async (
    jobId: string,
    payload: Partial<Job>
): Promise<any> => {
    const { jobsData } = getLocalStore();

    for (const index in jobsData) {
        if (jobsData[index].id === jobId) {
            jobsData[index] = {
                ...jobsData[index],
                ...payload,
                applicants: [
                    ...jobsData[index].applicants,
                    ...(payload.applicants as string[]),
                ],
            };
        }
    }

    await updateJobsLocalStore(jobsData);

    return fakePromise();
};

export const deleteJob = async (jobId: string): Promise<any> => {
    return fakePromise();
};
