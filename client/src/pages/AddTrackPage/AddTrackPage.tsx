import { useEffect } from "react";
import { Button, Form } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { toast } from "react-toastify";
import {
    addTrackThunk,
    getArtistAlbumsThunk,
    getArtistsThunk,
} from "../../store/musicSlice/musicThunks";
import AppInput from "../../components/AppInput/AppInput";
import AddFormWrapper from "../../components/AddFormWrapper/AddFormWrapper";
import type { TrackFormType } from "../../types/TrackFormType";
import AppSelect from "../../components/AppSelect/AppSelect";
import AppInputNumber from "../../components/AppInputNumber/AppInputNumber";

const AddTrackPage = () => {
    const dispatch = useAppDispatch();

    const [form] = Form.useForm();

    const artistId = Form.useWatch("artistId", form);

    const isSending = useAppSelector((state) => state.music.isSending);
    const success = useAppSelector((state) => state.music.success);
    const artists = useAppSelector((state) => state.music.artists);
    const artistAlbums = useAppSelector((state) => state.music.artistAlbums);
    const isLoadingArtists = useAppSelector(
        (state) => state.music.isLoadingArtists,
    );
    const isLoadingAlbums = useAppSelector(
        (state) => state.music.isLoadingAlbums,
    );

    const handleAdd = (data: TrackFormType) => {
        const newTrack = {
            title: data.title,
            duration: data.duration,
            youtubeUrl: data.youtubeUrl,
            albumId: data.albumId,
        };

        dispatch(addTrackThunk(newTrack));
    };

    useEffect(() => {
        if (success) form.resetFields();
    }, [success]);

    useEffect(() => {
        dispatch(getArtistsThunk());
    }, [dispatch]);

    return (
        <AddFormWrapper title="Add Track">
            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={(values) => handleAdd(values)}
                onFinishFailed={() => toast.error("Please complete the form")}
                autoComplete="off"
            >
                <Form.Item<TrackFormType>
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: "Please input track title!",
                        },
                    ]}
                >
                    <AppInput />
                </Form.Item>
                <Form.Item<TrackFormType>
                    label="Youtube (url)"
                    name="youtubeUrl"
                    rules={[
                        {
                            required: true,
                            message: "Please input youtube url!",
                        },
                    ]}
                >
                    <AppInput />
                </Form.Item>

                <Form.Item
                    label="Duration (seconds)"
                    name="duration"
                    rules={[
                        { required: true, message: "Enter duration" },
                        {
                            type: "number",
                            min: 1,
                            max: 200000000,
                            message:
                                "Duration should be between 1 second and 200,000,000 seconds",
                        },
                    ]}
                >
                    <AppInputNumber />
                </Form.Item>

                <Form.Item
                    label="Artist"
                    name="artistId"
                    rules={[{ required: true, message: "Choose artist" }]}
                >
                    <AppSelect
                        loading={isLoadingArtists}
                        options={artists.map((a) => ({
                            label: a.name,
                            value: a.id,
                        }))}
                        onChange={(artistId) => {
                            dispatch(getArtistAlbumsThunk(Number(artistId)));
                            form.setFieldsValue({ albumId: undefined });
                        }}
                        optionRender={(option) => (
                            <span style={{ color: "#151312" }}>
                                {option.label}
                            </span>
                        )}
                    />
                </Form.Item>
                <Form.Item
                    label="Album"
                    name="albumId"
                    rules={[
                        {
                            required: true,
                            message: "Please choose album",
                        },
                    ]}
                >
                    <AppSelect
                        disabled={!artistId}
                        loading={isLoadingAlbums}
                        options={artistAlbums.map((a) => {
                            return { label: a.title, value: a.id };
                        })}
                        optionRender={(option) => (
                            <span style={{ color: "#151312" }}>
                                {option.label}
                            </span>
                        )}
                    />
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

export default AddTrackPage;
