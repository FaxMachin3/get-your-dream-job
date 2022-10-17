import { Card, Input, Select, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// import { debounce } from '../../utils/common';

import './styles.scss';
import { FilterType, tagsOptions } from '../../constants';

interface FilterProps {
    getJobsForUser: (jobFilter: FilterType) => void;
}

const Filter: React.FC<FilterProps> = ({ getJobsForUser }) => {
    const timer = useRef<NodeJS.Timeout | null>(null);
    const [filter, setFilter] = useState<FilterType>({
        tags: [],
        minSalary: '',
    });

    useEffect(() => {
        clearTimeout(timer.current as NodeJS.Timeout);
        timer.current = setTimeout(() => {
            getJobsForUser(filter);
        }, 150);
    }, [filter]);

    // const searchJobs = useMemo(
    //     () =>
    //         debounce(() => {
    //             // console.log(filter);
    //             // getJobsForUser(filter);
    //         }),
    //     [getJobsForUser]
    // );

    const renderOptions = () => {
        return tagsOptions.map((tag) => (
            <Select.Option key={tag}>{tag}</Select.Option>
        ));
    };

    const onMinSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            minSalary: e.target.value,
        }));
        // searchJobs();
    };

    const onTagChange = (value: string[]) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            tags: value,
        }));
        // searchJobs();
    };

    return (
        <Card>
            <Typography.Paragraph className="filter-title" strong>
                Filter
            </Typography.Paragraph>
            <label>
                <Typography.Paragraph>Tags</Typography.Paragraph>
                <Select
                    showSearch
                    showArrow
                    className="search-input"
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="e.g. css or typescript"
                    onChange={onTagChange}
                >
                    {renderOptions()}
                </Select>
            </label>

            <label>
                <Typography.Paragraph>Minimum Salary</Typography.Paragraph>
                <Input
                    placeholder="e.g. 1500000"
                    value={filter.minSalary}
                    name="minSalary"
                    onChange={onMinSalaryChange}
                    className="min-salary-input"
                    type="number"
                    size="large"
                />
            </label>
        </Card>
    );
};

export default Filter;
