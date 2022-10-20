import React from 'react';
import { FilterType } from '../../constants';
import Filter from '../filter';

import './styles.scss';

interface SidebarProps {
    getJobsForUser: (jobFilter?: FilterType) => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    return (
        <aside className="sidebar">
            <Filter {...props} />
        </aside>
    );
};

export default Sidebar;
