import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../components/App';
import Error from '../components/error';
import Loader from '../components/loader';
import { ROUTES } from '../constants';

const Login = lazy(() => import('../components/login'));
const SignUp = lazy(() => import('../components/sign-up'));
const JobListing = lazy(() => import('../components/job-listing'));
const Profile = lazy(() => import('../components/profile'));

export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: ROUTES.LOGIN,
                element: (
                    <Suspense fallback={<Loader />}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.RECRUITER_SIGN_UP,
                element: (
                    <Suspense fallback={<Loader />}>
                        <SignUp />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.CANDIDATE_SIGN_UP,
                element: (
                    <Suspense fallback={<Loader />}>
                        <SignUp />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.JOB_LISTING,
                element: (
                    <Suspense fallback={<Loader />}>
                        <JobListing />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.PROFILE,
                element: (
                    <Suspense fallback={<Loader />}>
                        <Profile />
                    </Suspense>
                ),
            },
        ],
    },
]);
