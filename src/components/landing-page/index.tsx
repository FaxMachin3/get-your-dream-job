import React, { useContext } from 'react';
import { Button, Typography, Image } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { UserContext } from '../../contexts/UserContext';
import backdrop from '../../assests/job-offer.svg';

import './styles.scss';

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
    const { currentUser } = useContext(UserContext);

    if (currentUser) {
        return <Navigate to={ROUTES.JOB_LISTING} />;
    }

    return (
        <section className="landing">
            <div className="landing-text">
                <div className="landing-content">
                    <Typography.Title>
                        Join us to get your dream job now!
                    </Typography.Title>
                    <Typography.Paragraph className="sub-title">
                        The voyage of discovery is not in looking for new
                        landscapes, but in looking with new eyes.
                    </Typography.Paragraph>
                    <div className="button-container">
                        <Button
                            type="default"
                            className="sign-up-btn"
                            size="large"
                        >
                            <Link to={ROUTES.RECRUITER_SIGN_UP}>
                                Recruiter sign-up
                            </Link>
                        </Button>
                        <Button
                            type="primary"
                            className="sign-up-btn"
                            size="large"
                        >
                            <Link to={ROUTES.CANDIDATE_SIGN_UP}>
                                Candidate sign-up
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="backdrop">
                <Image src={backdrop} preview={false} alt="backdrop" />
            </div>
        </section>
    );
};

export default LandingPage;
