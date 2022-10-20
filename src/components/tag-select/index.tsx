import { Select, Typography } from 'antd';
import React from 'react';
import { tagsOptions } from '../../constants';

import './styles.scss';

interface TagSelectProps {
    onTagChange: (value: string[]) => void;
    defaultValue?: string[];
}

const TagSelect: React.FC<TagSelectProps> = ({
    onTagChange,
    defaultValue = [],
}) => {
    const renderOptions = () => {
        return tagsOptions.map((tag) => (
            <Select.Option key={tag}>{tag}</Select.Option>
        ));
    };

    return (
        <label>
            <Typography.Paragraph>Tags</Typography.Paragraph>
            <Select
                showSearch
                showArrow
                className="search-input"
                defaultValue={defaultValue}
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
    );
};

export default TagSelect;
