import { addArtistThunk } from "@/store/artistSlice/artistThunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { extractFile } from "@/utils/extract-file";
import { Form } from "antd";
import type { ArtistFormType } from "@/types/artist/artist-form.types";

const useArtistForm = () => {
    const dispatch = useAppDispatch();

    const [form] = Form.useForm();

    const { isSending } = useAppSelector((state) => state.artist);

    const handleAdd = async (data: ArtistFormType) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("info", data.info);

        const file = extractFile(data.photo);

        if (file) {
            formData.append("photo", file);
        }

        await dispatch(addArtistThunk(formData)).unwrap();

        form.resetFields();
    };

    return {
        form,
        handleAdd,
        isSending,
    };
};

export default useArtistForm;
