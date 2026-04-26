import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/store";
import type { ArtistFormType } from "../../types/ArtistFormType";
import type { UploadChangeParam, UploadFile } from "antd/es/upload";
import { toast } from "react-toastify";
import { extractFile } from "../../utils/extractFile";
import { addArtistThunk } from "../../store/musicSlice/musicThunks";
import AppUpload from "../../components/AppUpload/AppUpload";
import AddFormWrapper from "../../components/AddFormWrapper/AddFormWrapper";

const AddArtistPage = () => {
    const dispatch = useAppDispatch();

    const [form] = Form.useForm();

    const isSending = useAppSelector((state) => state.music.isSending);
    const success = useAppSelector((state) => state.music.success);

    const handleAdd = (data: ArtistFormType) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("info", data.info);

        const file = extractFile(data.photo);

        if (file) {
            formData.append("photo", file);
        }

        dispatch(addArtistThunk(formData));
    };

    const getPhoto = (e: UploadChangeParam<UploadFile>) => {
        return e.fileList;
    };

    useEffect(() => {
        if (success) form.resetFields();
    }, [success]);

    return (
        <AddFormWrapper>
            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={(values) => handleAdd(values)}
                onFinishFailed={() => toast.error("Please complete the form")}
                autoComplete="off"
            >
                <Form.Item<ArtistFormType>
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input artist name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<ArtistFormType>
                    label="Info"
                    name="info"
                    rules={[
                        {
                            required: true,
                            message: "Please input artist info!",
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="photo"
                    label="Photo"
                    valuePropName="fileList"
                    getValueFromEvent={getPhoto}
                    rules={[
                        {
                            required: true,
                            validator: (_, value) => {
                                if (!value || value.length === 0) {
                                    return Promise.reject(
                                        "Please upload photo!",
                                    );
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <AppUpload />
                </Form.Item>

                <Form.Item label={null}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSending}
                    >
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </AddFormWrapper>
    );
};

export default AddArtistPage;
