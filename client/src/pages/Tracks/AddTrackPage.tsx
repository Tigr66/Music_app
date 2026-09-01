import { Button, Form } from "antd";
import { AddFormWrapper, FormInput, FormSelect } from "@/components/form";
import type { TrackFormType } from "@/types/track/track-form.types";
import useTrackForm from "./hooks/useTrackForm";

const AddTrackPage = () => {
    const {
        form,
        handleAdd,
        artistId,
        isLoadingArtists,
        artists,
        isLoadingAlbums,
        artistAlbums,
        onChangeArtist,
        isSending,
    } = useTrackForm();

    return (
        <AddFormWrapper title="Add Track">
            <Form<TrackFormType>
                form={form}
                name="basic"
                layout="vertical"
                onFinish={(values) => handleAdd(values)}
                autoComplete="off"
            >
                <FormInput<TrackFormType> label="Title" name="title" required />
                <FormInput<TrackFormType>
                    label="Youtube (url)"
                    name="youtubeUrl"
                    required
                />
                <FormInput<TrackFormType>
                    label="Duration (seconds)"
                    name="duration"
                    type="number"
                    min={1}
                    max={200000000}
                    required
                />
                <FormSelect<TrackFormType>
                    label="Artist"
                    name="artistId"
                    loading={isLoadingArtists}
                    onChange={onChangeArtist}
                    options={artists.map((a) => ({
                        label: a.name,
                        value: a.id,
                    }))}
                    showSearch={{
                        optionFilterProp: "label",
                    }}
                    required
                />

                <FormSelect
                    label="Album"
                    name="albumId"
                    disabled={!artistId}
                    loading={isLoadingAlbums}
                    options={artistAlbums.map((a) => {
                        return { label: a.title, value: a.id };
                    })}
                    showSearch={{
                        optionFilterProp: "label",
                    }}
                    required
                />

                <Button
                    type="primary"
                    htmlType="submit"
                    className="form_button"
                    loading={isSending}
                >
                    Add
                </Button>
            </Form>
        </AddFormWrapper>
    );
};

export default AddTrackPage;
