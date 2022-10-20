import { LOCAL_STORAGE } from '../constants';
import { Job } from '../fake-apis/job-listing-apis';
import { User } from '../fake-apis/user-apis';
import fakeJobsData from '../fake-databases/job-listing';
import fakeUsersData from '../fake-databases/users';

export const DELAY = 300;

export enum ERROR {
    CHECK_CREDENTIALS = 'Please check your credentials.',
    CHECK_FORM_DATA = 'Please fill asterisk(*) marked fields',
    USER_EXISTS = 'This user is already registered.',
    FEATURE_INCOMING = 'Feature on the way!',
    PASSWORD_MISMATCH = 'Password mismatch!',
    INVALID_EMAIL = 'Invalid email!',
    INVALID_GITHUB = 'Invalid GitHut username!',
}

export enum SUCCESS {
    JOB_APPLIED = 'Applied!',
    JOB_CREATED = 'Job created!',
    PROFILE_SAVED = 'Profile saved!',
}

export const getLocalStore = () => {
    let usersData: User[] = fakeUsersData;

    const _users: User[] | null = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE._USERS) as any
    );
    if (_users) {
        usersData = _users;
    } else {
        localStorage.setItem(LOCAL_STORAGE._USERS, JSON.stringify(usersData));
    }
    // console.log('configured _users store', usersData);

    let jobsData: Job[] = fakeJobsData;

    const _jobs: Job[] | null = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE._JOBS) as any
    );
    if (_jobs) {
        jobsData = _jobs;
    } else {
        localStorage.setItem(LOCAL_STORAGE._JOBS, JSON.stringify(jobsData));
    }
    // console.log('configured _jobs store', jobsData);

    return { usersData, jobsData };
};

export const updateUsersLocalStore = (newUsersData: User[]) => {
    localStorage.setItem(LOCAL_STORAGE._USERS, JSON.stringify(newUsersData));
    return fakePromise('_users update');
};

export const updateJobsLocalStore = (newJobsData: Job[]) => {
    localStorage.setItem(LOCAL_STORAGE._JOBS, JSON.stringify(newJobsData));
    return fakePromise('_users update');
};

export const fakePromise = (resData: any = null, rejData: any = null) =>
    new Promise((res, rej) => {
        setTimeout(() => {
            if (rejData) rej(rejData);
            else res(resData);
        }, DELAY);
    });
