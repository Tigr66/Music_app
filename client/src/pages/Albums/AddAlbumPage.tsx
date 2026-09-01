import { Button, Form } from "antd";
import {
    AddFormWrapper,
    FormInput,
    FormSelect,
    FormUpload,
} from "@/components/form";
import type { AlbumFormType } from "@/types/album/album-form.types";
import { getPhoto } from "@/utils/get-photo";
import useAlbumForm from "./hooks/useAlbumForm";

const AddAlbumPage = () => {
    const { form, isLoadingArtists, artists, handleAdd, isSending } =
        useAlbumForm();

    return (
        <AddFormWrapper title="Add Album">
            <Form<AlbumFormType>
                form={form}
                name="basic"
                layout="vertical"
                onFinish={(values) => handleAdd(values)}
                autoComplete="off"
            >
                <FormInput<AlbumFormType> label="Title" name="title" required />

                <FormSelect
                    label="Artist"
                    name="artistId"
                    loading={isLoadingArtists}
                    options={artists.map((a) => {
                        return { label: a.name, value: a.id };
                    })}
                    showSearch={{
                        optionFilterProp: "label",
                    }}
                    required
                />

                <FormUpload
                    name="cover"
                    label="Cover"
                    valuePropName="fileList"
                    getValueFromEvent={getPhoto}
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

export default AddAlbumPage;
