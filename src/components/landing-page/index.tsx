import React from 'react';
import './styles.scss';

import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-content">
                    <Typography.Title>
                        Join us to get your dream job now!
                    </Typography.Title>
                    <Typography.Paragraph className="sub-title">
                        The voyage of discovery is not in looking for new
                        landscapes, but in looking with new eyes.
                    </Typography.Paragraph>
                    <div>
                        <Button
                            type="default"
                            className="recruiter-sign-up-btn"
                        >
                            <Link to={ROUTES.RECRUITER_SIGN_UP}>
                                Recruiter sign-up
                            </Link>
                        </Button>
                        <Button type="primary">
                            <Link to={ROUTES.CANDIDATE_SIGN_UP}>
                                Candidate sign-up
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingPage;
