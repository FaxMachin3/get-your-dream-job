import { tagsOptions } from '../constants';
import { Job } from '../fake-apis/job-listing-apis';

const generateJobData = () => {
    const companyName: any = [
        'Paytm',
        'Bolt',
        'Intuit',
        'Amazon',
        'Netflix',
        'Google',
        'Apple',
        'Microsoft',
        'Uber',
        'Atlassian',
        'Rippling',
        'Rubrik',
        'Reliance',
        'Cred',
        'Coinbase',
        'Plum',
    ];
    const title: any = [
        'FrontEnd Engineer - II',
        'FrontEnd Engineer - III',
        'Backend Engineer - II',
        'Backend Engineer - III',
        'QA Engineer - II',
        'QA Engineer - III',
        'Devops Engineer - II',
        'Devops Engineer - III',
        'Data Scientist - II',
        'Data Scientist - III',
        'Support Engineer - II',
        'Support Engineer - III',
        'Staff Engineer - II',
        'Staff Engineer - III',
        'CEO',
    ];
    const location: any = [
        'Ranchi',
        'Bengaluru',
        'Mumbai',
        'New York',
        'Pune',
        'Estonia',
        'Singapore',
        'Delhi',
        'Hyderabad',
        'Poland',
        'Warsaw',
        'Pakistan',
        'China',
    ];
    // year month day
    const createdAt: any = [
        [2, 7, 2023],
        [3, 6, 2022],
        [21, 7, 2021],
        [9, 8, 2021],
        [11, 7, 2021],
        [2, 7, 2121],
        [2, 8, 2021],
        [21, 7, 2022],
        [16, 5, 2021],
        [17, 4, 2020],
        [23, 4, 2024],
        [10, 12, 2024],
        [15, 1, 2022],
        [19, 2, 2024],
        [27, 7, 2019],
    ];
    const createdBy: any = ['U-10004', 'U-10005', 'U-10006'];
    const contact: any = [9360602123, 'janedoe@gmail.com', 4660602123];

    const getRandomNumber = (max: number, min: number = 0): number => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const data: Job[] = [];

    for (let index = 1; index <= 150; index++) {
        const createdByIndex = getRandomNumber(createdBy.length - 1);
        data.push({
            id: `J-${10000 + index}`,
            companyName: companyName[getRandomNumber(companyName.length - 1)],
            title: title[getRandomNumber(title.length - 1)],
            contact: contact[createdByIndex],
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit pellentesque habitant morbi tristique senectus et netus. Tristique et egestas quis ipsum suspendisse. In vitae turpis massa sed elementum tempus egestas. Sed faucibus turpis in eu mi bibendum neque egestas. Mattis enim ut tellus elementum sagittis vitae et leo duis. Rhoncus est pellentesque elit ullamcorper dignissim. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Vel pharetra vel turpis nunc eget lorem dolor. Ipsum nunc aliquet bibendum enim facilisis. Cursus vitae congue mauris rhoncus. Volutpat maecenas volutpat blandit aliquam. Elit duis tristique sollicitudin nibh sit amet commodo nulla.',
            requirement: '',
            location: location[getRandomNumber(location.length - 1)],
            createdAt: new Date(
                createdAt[getRandomNumber(createdAt.length - 1)].reverse()
            ),
            createdBy: createdBy[createdByIndex],
            salaryRange: [getRandomNumber(9000000, 500000), 9000000],
            tags: tagsOptions.slice(
                getRandomNumber(tagsOptions.length - 1),
                getRandomNumber(
                    tagsOptions.length - 1,
                    Math.floor((tagsOptions.length - 1) / 2)
                )
            ),
            applicants: ['U-10003'],
        });
    }

    return data;
};

// const jobListing: Job[] = [
//     {
//         id: 'J-10001',
//         companyName: 'Intuit',
//         title: 'Frontend Engineer - II',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit pellentesque habitant morbi tristique senectus et netus. Tristique et egestas quis ipsum suspendisse. In vitae turpis massa sed elementum tempus egestas. Sed faucibus turpis in eu mi bibendum neque egestas. Mattis enim ut tellus elementum sagittis vitae et leo duis. Rhoncus est pellentesque elit ullamcorper dignissim. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Vel pharetra vel turpis nunc eget lorem dolor. Ipsum nunc aliquet bibendum enim facilisis. Cursus vitae congue mauris rhoncus. Volutpat maecenas volutpat blandit aliquam. Elit duis tristique sollicitudin nibh sit amet commodo nulla.',
//         requirement: '',
//         location: 'Bengaluru',
//         createdAt: new Date('11/07/2022'),
//         createdBy: 'U-10004',
//         salaryRange: [0, 9000000],
//         tags: [
//             'CSS',
//             'HTML',
//             'Javascript',
//             'React.js',
//             'Typescript',
//             'Next.js',
//             'Ruby',
//         ],
//         applicants: ['U-10001', 'U-10002', 'U-10003'],
//     },
//     {
//         id: 'J-10002',
//         companyName: 'Rippling',
//         title: 'Frontend Engineer - II',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit pellentesque habitant morbi tristique senectus et netus. Tristique et egestas quis ipsum suspendisse. In vitae turpis massa sed elementum tempus egestas. Sed faucibus turpis in eu mi bibendum neque egestas. Mattis enim ut tellus elementum sagittis vitae et leo duis. Rhoncus est pellentesque elit ullamcorper dignissim. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Vel pharetra vel turpis nunc eget lorem dolor. Ipsum nunc aliquet bibendum enim facilisis. Cursus vitae congue mauris rhoncus. Volutpat maecenas volutpat blandit aliquam. Elit duis tristique sollicitudin nibh sit amet commodo nulla.',
//         requirement: '',
//         location: 'Bengaluru',
//         createdAt: new Date('12/07/2022'),
//         createdBy: 'U-10004',
//         salaryRange: [3000000, 9000000],
//         tags: [
//             'CSS',
//             'HTML',
//             'Javascript',
//             'React.js',
//             'Typescript',
//             'Next.js',
//         ],
//         applicants: ['U-10003'],
//     },
//     {
//         id: 'J-10003',
//         companyName: 'Amazon',
//         title: 'Frontend Engineer - II',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit pellentesque habitant morbi tristique senectus et netus. Tristique et egestas quis ipsum suspendisse. In vitae turpis massa sed elementum tempus egestas. Sed faucibus turpis in eu mi bibendum neque egestas. Mattis enim ut tellus elementum sagittis vitae et leo duis. Rhoncus est pellentesque elit ullamcorper dignissim. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Vel pharetra vel turpis nunc eget lorem dolor. Ipsum nunc aliquet bibendum enim facilisis. Cursus vitae congue mauris rhoncus. Volutpat maecenas volutpat blandit aliquam. Elit duis tristique sollicitudin nibh sit amet commodo nulla.',
//         requirement: '',
//         location: 'Bengaluru',
//         createdAt: new Date('01/07/2022'),
//         createdBy: 'U-10005',
//         salaryRange: [6000000, 9000000],
//         tags: [
//             'CSS',
//             'HTML',
//             'Javascript',
//             'React.js',
//             'Typescript',
//             'Next.js',
//         ],
//         applicants: [],
//     },
//     {
//         id: 'J-10004',
//         companyName: 'Google',
//         title: 'Frontend Engineer - II',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit pellentesque habitant morbi tristique senectus et netus. Tristique et egestas quis ipsum suspendisse. In vitae turpis massa sed elementum tempus egestas. Sed faucibus turpis in eu mi bibendum neque egestas. Mattis enim ut tellus elementum sagittis vitae et leo duis. Rhoncus est pellentesque elit ullamcorper dignissim. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Vel pharetra vel turpis nunc eget lorem dolor. Ipsum nunc aliquet bibendum enim facilisis. Cursus vitae congue mauris rhoncus. Volutpat maecenas volutpat blandit aliquam. Elit duis tristique sollicitudin nibh sit amet commodo nulla.',
//         requirement: '',
//         location: 'Bengaluru',
//         createdAt: new Date('10/07/2022'),
//         createdBy: 'U-10006',
//         salaryRange: [0, 9000000],
//         tags: [
//             'CSS',
//             'HTML',
//             'Javascript',
//             'React.js',
//             'Typescript',
//             'Next.js',
//             'Ruby',
//         ],
//         applicants: [],
//     },
//     {
//         id: 'J-10005',
//         companyName: 'Bolt',
//         title: 'Frontend Engineer - II',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit pellentesque habitant morbi tristique senectus et netus. Tristique et egestas quis ipsum suspendisse. In vitae turpis massa sed elementum tempus egestas. Sed faucibus turpis in eu mi bibendum neque egestas. Mattis enim ut tellus elementum sagittis vitae et leo duis. Rhoncus est pellentesque elit ullamcorper dignissim. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Vel pharetra vel turpis nunc eget lorem dolor. Ipsum nunc aliquet bibendum enim facilisis. Cursus vitae congue mauris rhoncus. Volutpat maecenas volutpat blandit aliquam. Elit duis tristique sollicitudin nibh sit amet commodo nulla.',
//         requirement: '',
//         location: 'Bengaluru',
//         createdAt: new Date('12/06/2022'),
//         createdBy: 'U-10005',
//         salaryRange: [7050000, 9000000],
//         tags: [
//             'CSS',
//             'HTML',
//             'Javascript',
//             'React.js',
//             'Typescript',
//             'Next.js',
//             'Dart',
//         ],
//         applicants: [],
//     },
//     {
//         id: 'J-10006',
//         companyName: 'Intuit',
//         title: 'Frontend Engineer - II',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit pellentesque habitant morbi tristique senectus et netus. Tristique et egestas quis ipsum suspendisse. In vitae turpis massa sed elementum tempus egestas. Sed faucibus turpis in eu mi bibendum neque egestas. Mattis enim ut tellus elementum sagittis vitae et leo duis. Rhoncus est pellentesque elit ullamcorper dignissim. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Vel pharetra vel turpis nunc eget lorem dolor. Ipsum nunc aliquet bibendum enim facilisis. Cursus vitae congue mauris rhoncus. Volutpat maecenas volutpat blandit aliquam. Elit duis tristique sollicitudin nibh sit amet commodo nulla.',
//         requirement: '',
//         location: 'Bengaluru',
//         createdAt: new Date('12/07/2021'),
//         createdBy: 'U-10005',
//         salaryRange: [3000000, 9000000],
//         tags: [
//             'CSS',
//             'HTML',
//             'Javascript',
//             'React.js',
//             'Typescript',
//             'Next.js',
//         ],
//         applicants: [],
//     },
//     {
//         id: 'J-10007',
//         companyName: 'Netflix',
//         title: 'Frontend Engineer - II',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit pellentesque habitant morbi tristique senectus et netus. Tristique et egestas quis ipsum suspendisse. In vitae turpis massa sed elementum tempus egestas. Sed faucibus turpis in eu mi bibendum neque egestas. Mattis enim ut tellus elementum sagittis vitae et leo duis. Rhoncus est pellentesque elit ullamcorper dignissim. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Vel pharetra vel turpis nunc eget lorem dolor. Ipsum nunc aliquet bibendum enim facilisis. Cursus vitae congue mauris rhoncus. Volutpat maecenas volutpat blandit aliquam. Elit duis tristique sollicitudin nibh sit amet commodo nulla.',
//         requirement: '',
//         location: 'Bengaluru',
//         createdAt: new Date('18/07/2022'),
//         createdBy: 'U-10006',
//         salaryRange: [0, 9000000],
//         tags: [
//             'CSS',
//             'HTML',
//             'Javascript',
//             'React.js',
//             'Typescript',
//             'Next.js',
//         ],
//         applicants: [],
//     },
//     {
//         id: 'J-10008',
//         companyName: 'Apple',
//         title: 'Frontend Engineer - II',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit pellentesque habitant morbi tristique senectus et netus. Tristique et egestas quis ipsum suspendisse. In vitae turpis massa sed elementum tempus egestas. Sed faucibus turpis in eu mi bibendum neque egestas. Mattis enim ut tellus elementum sagittis vitae et leo duis. Rhoncus est pellentesque elit ullamcorper dignissim. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Vel pharetra vel turpis nunc eget lorem dolor. Ipsum nunc aliquet bibendum enim facilisis. Cursus vitae congue mauris rhoncus. Volutpat maecenas volutpat blandit aliquam. Elit duis tristique sollicitudin nibh sit amet commodo nulla.',
//         requirement: '',
//         location: 'Bengaluru',
//         createdAt: new Date('19/07/2022'),
//         createdBy: 'U-10006',
//         salaryRange: [0, 1000000],
//         tags: [
//             'CSS',
//             'HTML',
//             'Javascript',
//             'React.js',
//             'Typescript',
//             'Next.js',
//         ],
//         applicants: [],
//     },
//     {
//         id: 'J-10009',
//         companyName: 'Zerodha',
//         title: 'Frontend Engineer - II',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit pellentesque habitant morbi tristique senectus et netus. Tristique et egestas quis ipsum suspendisse. In vitae turpis massa sed elementum tempus egestas. Sed faucibus turpis in eu mi bibendum neque egestas. Mattis enim ut tellus elementum sagittis vitae et leo duis. Rhoncus est pellentesque elit ullamcorper dignissim. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Vel pharetra vel turpis nunc eget lorem dolor. Ipsum nunc aliquet bibendum enim facilisis. Cursus vitae congue mauris rhoncus. Volutpat maecenas volutpat blandit aliquam. Elit duis tristique sollicitudin nibh sit amet commodo nulla.',
//         requirement: '',
//         location: 'Bengaluru',
//         createdAt: new Date('22/07/2022'),
//         createdBy: 'U-10004',
//         salaryRange: [0, 9000000],
//         tags: [
//             'CSS',
//             'HTML',
//             'Javascript',
//             'React.js',
//             'Typescript',
//             'Next.js',
//             'Ruby',
//         ],
//         applicants: [],
//     },
//     {
//         id: 'J-10010',
//         companyName: 'Tekion',
//         title: 'Frontend Engineer - II',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit pellentesque habitant morbi tristique senectus et netus. Tristique et egestas quis ipsum suspendisse. In vitae turpis massa sed elementum tempus egestas. Sed faucibus turpis in eu mi bibendum neque egestas. Mattis enim ut tellus elementum sagittis vitae et leo duis. Rhoncus est pellentesque elit ullamcorper dignissim. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Vel pharetra vel turpis nunc eget lorem dolor. Ipsum nunc aliquet bibendum enim facilisis. Cursus vitae congue mauris rhoncus. Volutpat maecenas volutpat blandit aliquam. Elit duis tristique sollicitudin nibh sit amet commodo nulla.',
//         requirement: '',
//         location: 'Bengaluru',
//         createdAt: new Date('02/07/2022'),
//         createdBy: 'U-10006',
//         salaryRange: [0, 9000000],
//         tags: [
//             'CSS',
//             'HTML',
//             'Javascript',
//             'React.js',
//             'Typescript',
//             'Next.js',
//         ],
//         applicants: [],
//     },
// ];
const jobListing: Job[] = generateJobData();

export default jobListing;
