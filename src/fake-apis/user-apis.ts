import { USER_TYPE } from '../constants';
import {
    getLocalStore,
    ERROR,
    fakePromise,
    updateUsersLocalStore,
} from '../utils/fake-apis-utils';

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    userDetails: {
        type: USER_TYPE;
        contact?: string;
        location: string;
        githubUsername?: string;
        skills?: Array<string>;
        appliedTo?: Array<string>;
        companyName?: string;
    };
}

export const getAllUsers = async () => {};

export const createUser = async (payload: Partial<User>): Promise<any> => {
    const { usersData } = getLocalStore();
    const user = usersData.find(({ email }) => email === payload.email);

    if (user) return fakePromise(null, ERROR.USER_EXISTS);

    const id = `U-${10000 + usersData.length + 1}`;
    const newUserData = { ...payload, id } as User;
    usersData.push(newUserData);

    await updateUsersLocalStore(usersData);

    return fakePromise(newUserData);
};

export const getAppliedUsers = (applicants: string[]): Promise<User[]> => {
    const applicantsSet = new Set(applicants);
    const { usersData } = getLocalStore();

    const applicantsOfJob = usersData.filter(({ id }) => applicantsSet.has(id));
    return fakePromise(applicantsOfJob) as Promise<User[]>;
};

export const getUser = async (
    userEmail: string,
    userPassword: string
): Promise<any> => {
    const { usersData } = getLocalStore();
    const user = usersData.find(
        ({ email, password }) =>
            email === userEmail && password === userPassword
    );

    return user
        ? fakePromise(user)
        : fakePromise(null, ERROR.CHECK_CREDENTIALS);
};

export const updateUser = async (
    userEmail: string,
    payload: Partial<User>
): Promise<any> => {
    const { usersData } = getLocalStore();
    for (const index in usersData) {
        if (usersData[index].email === userEmail) {
            usersData[index] = {
                ...usersData[index],
                ...payload,
            };
            break;
        }
    }

    await updateUsersLocalStore(usersData);

    return fakePromise();
};

export const deleteUser = async (userId: string): Promise<any> => {
    return fakePromise();
};

export const getUserGitHubRepos = async (
    username: string = ''
): Promise<any> => {
    try {
        const res = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
        );
        const data = await res.json();
        if (data.length === 0 || !!data.message) {
            throw new Error(ERROR.INVALID_GITHUB);
        }
        return fakePromise(data);
    } catch (error: any) {
        return fakePromise(null, error.message);
    }
};
