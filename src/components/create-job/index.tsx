import { Form, Input, Typography, Slider, Alert } from 'antd';
import { _16KB } from '../../constants';
import { Job } from '../../fake-apis/job-listing-apis';
import TagSelect from '../tag-select';

import './styles.scss';

interface CreateJobProps {
    jobFormData: Partial<Job>;
    setJobFormData: React.Dispatch<React.SetStateAction<Partial<Job>>>;
}

const CreateJob: React.FC<CreateJobProps> = ({
    jobFormData,
    setJobFormData,
}) => {
    const onChangeHandler = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setJobFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const onTagChange = (value: string[]) => {
        setJobFormData((prevData) => ({
            ...prevData,
            tags: value,
        }));
    };

    const onSliderChange = (value: [number, number]) => {
        setJobFormData((prevData) => ({
            ...prevData,
            salaryRange: [value[0] * 100000, value[1] * 100000],
        }));
    };

    return (
        <section className="create-job-wrapper">
            <Typography.Title className="title">Create Job</Typography.Title>
            <Form
                name="create-job"
                layout="vertical"
                initialValues={{
                    remember: true,
                    companyName: jobFormData.companyName,
                    contact: jobFormData.contact,
                }}
                autoComplete="on"
            >
                <Form.Item label="Company" name="companyName">
                    <Input
                        name="companyName"
                        placeholder="* e.g. Intuit or Paytm"
                        value={jobFormData.companyName}
                        onChange={onChangeHandler}
                        size="large"
                        required
                    />
                </Form.Item>
                <Form.Item label="Title" name="title">
                    <Input
                        name="title"
                        placeholder="* e.g. Frontend Engineer"
                        value={jobFormData.title}
                        onChange={onChangeHandler}
                        size="large"
                        required
                    />
                </Form.Item>
                <Form.Item label="Contact" name="contact">
                    <Input
                        name="contact"
                        placeholder="e.g. 8260602123"
                        value={jobFormData.contact}
                        onChange={onChangeHandler}
                        size="large"
                        required
                    />
                </Form.Item>
                <Form.Item
                    className="description-input"
                    label={
                        <div className="description-label">
                            <span>Description</span>
                            <span className="limit">
                                *
                                {_16KB -
                                    (jobFormData.description
                                        ?.length as number)}{' '}
                                words left
                            </span>
                        </div>
                    }
                    name="description"
                >
                    <Input.TextArea
                        name="description"
                        placeholder="* Tell something about the role"
                        maxLength={_16KB}
                        value={jobFormData.description}
                        onChange={onChangeHandler}
                        size="large"
                        required
                    />
                </Form.Item>
                <Form.Item label="Requirement" name="requirement">
                    <Input.TextArea
                        name="requirement"
                        placeholder="* Add requirements for the role"
                        maxLength={_16KB}
                        value={jobFormData.requirement}
                        onChange={onChangeHandler}
                        size="large"
                        required
                    />
                </Form.Item>
                <Form.Item label="Location" name="location">
                    <Input
                        name="location"
                        placeholder="* e.g. Bengaluru or Remote"
                        value={jobFormData.location}
                        onChange={onChangeHandler}
                        size="large"
                        required
                    />
                </Form.Item>
                <Form.Item label="Salary Range">
                    <Slider
                        range
                        defaultValue={[45, 70]}
                        onChange={onSliderChange}
                        tooltip={{
                            formatter: (value) => value && `${value}0K`,
                        }}
                    />
                </Form.Item>
                <TagSelect onTagChange={onTagChange} />
            </Form>
        </section>
    );
};

export default CreateJob;
