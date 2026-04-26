import { useEffect } from "react";
import { Button, Form } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/store";
import type { UploadChangeParam, UploadFile } from "antd/es/upload";
import { toast } from "react-toastify";
import { extractFile } from "../../utils/extractFile";
import {
    addAlbumThunk,
    getArtistsThunk,
} from "../../store/musicSlice/musicThunks";
import AppInput from "../../components/AppInput/AppInput";
import AppUpload from "../../components/AppUpload/AppUpload";
import AddFormWrapper from "../../components/AddFormWrapper/AddFormWrapper";
import type { AlbumFormType } from "../../types/AlbumFormType";
import AppSelect from "../../components/AppSelect/AppSelect";

const AddAlbumPage = () => {
    const dispatch = useAppDispatch();

    const [form] = Form.useForm();

    const isSending = useAppSelector((state) => state.music.isSending);
    const success = useAppSelector((state) => state.music.success);
    const artists = useAppSelector((state) => state.music.artists);
    const isLoadingArtists = useAppSelector(
        (state) => state.music.isLoadingArtists,
    );

    const handleAdd = (data: AlbumFormType) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("artistId", String(data.artistId));

        const file = extractFile(data.cover);

        if (file) {
            formData.append("cover", file);
        }

        dispatch(addAlbumThunk(formData));
    };

    const getCover = (e: UploadChangeParam<UploadFile>) => {
        return e.fileList;
    };

    useEffect(() => {
        if (success) form.resetFields();
    }, [success]);

    useEffect(() => {
        dispatch(getArtistsThunk());
    }, [dispatch]);

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
                <Form.Item<AlbumFormType>
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: "Please input album title!",
                        },
                    ]}
                >
                    <AppInput />
                </Form.Item>

                <Form.Item
                    label="Artist"
                    name="artistId"
                    rules={[
                        {
                            required: true,
                            message: "Please choose author",
                        },
                    ]}
                >
                    <AppSelect
                        loading={isLoadingArtists}
                        options={artists.map((a) => {
                            return { label: a.name, value: a.id };
                        })}
                        optionRender={(option) => (
                            <span style={{ color: "#151312" }}>
                                {option.label}
                            </span>
                        )}
                    />
                </Form.Item>

                <Form.Item
                    name="cover"
                    label="Cover"
                    valuePropName="fileList"
                    getValueFromEvent={getCover}
                    rules={[
                        {
                            required: true,
                            validator: (_, value) => {
                                if (!value || value.length === 0) {
                                    return Promise.reject(
                                        "Please upload cover!",
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

export default AddAlbumPage;
