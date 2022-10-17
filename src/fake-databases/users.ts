import { USER_TYPE } from '../constants';
import { User } from '../fake-apis/user-apis';

const users: User[] = [
    {
        id: 'U-10001',
        name: 'Subham Raj',
        email: 'subhamraj@gmail.com',
        password: '123456',
        userDetails: {
            type: USER_TYPE.CANDIDATE,
            githubUsername: 'faxmachin3',
            skills: ['JAVA', 'HTML'],
            appliedTo: ['J-10001'],
            companyName: 'Paytm',
        },
    },
    {
        id: 'U-10002',
        name: 'Akash Sharma',
        email: 'akashsharma@gmail.com',
        password: '123456',
        userDetails: {
            type: USER_TYPE.CANDIDATE,
            githubUsername: '',
            skills: ['JAVA', 'Angular.js', 'UI'],
            appliedTo: ['J-10001'],
            companyName: 'Zerodha',
        },
    },
    {
        id: 'U-10003',
        name: 'Prince Raj',
        email: 'princeraj@gmail.com',
        password: '123456',
        userDetails: {
            type: USER_TYPE.CANDIDATE,
            githubUsername: '',
            skills: ['Javascript'],
            appliedTo: ['J-10001', 'J-10002'],
            companyName: 'Intuit',
        },
    },
    {
        id: 'U-10004',
        name: 'John Doe',
        email: 'jhondoe@gmail.com',
        password: '123456',
        userDetails: {
            type: USER_TYPE.RECRUITER,
            companyName: 'Intuit',
        },
    },
    {
        id: 'U-10005',
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        password: '123456',
        userDetails: {
            type: USER_TYPE.RECRUITER,
            companyName: 'Bolt',
        },
    },
    {
        id: 'U-10006',
        name: 'John Cena',
        email: 'jhoncena@gmail.com',
        password: '123456',
        userDetails: {
            type: USER_TYPE.RECRUITER,
            companyName: 'Rippling',
        },
    },
];

export default users;
