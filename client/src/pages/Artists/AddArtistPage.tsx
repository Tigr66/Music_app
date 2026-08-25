import { AddFormWrapper } from "@/components/form/AddFormWrapper";
import { Button, Form } from "antd";
import { FormInput } from "@/components/form/FormInput";
import { FormTextArea } from "@/components/form/FormTextArea";
import { FormUpload } from "@/components/form/FormUpload";
import { getPhoto } from "@/utils/get-photo";
import { photoRules } from "@/rules/photo.rules";
import type { ArtistFormType } from "@/types/artist/artist-form.types";
import useArtistForm from "./hooks/useArtistForm";

const AddArtistPage = () => {
    const { form, handleAdd, isSending } = useArtistForm();

    return (
        <AddFormWrapper title="Add Artist">
            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={handleAdd}
                autoComplete="off"
            >
                <FormInput<ArtistFormType> label="Name" name="name" required />

                <FormTextArea<ArtistFormType>
                    label="Info"
                    name="info"
                    rows={4}
                    required
                />

                <FormUpload<ArtistFormType>
                    label="Photo"
                    name="photo"
                    valuePropName="fileList"
                    getValueFromEvent={getPhoto}
                    rules={[...photoRules]}
                />

                <Button type="primary" htmlType="submit" loading={isSending}>
                    Add
                </Button>
            </Form>
        </AddFormWrapper>
    );
};

export default AddArtistPage;
