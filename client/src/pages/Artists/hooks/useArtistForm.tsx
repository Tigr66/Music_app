import { addArtistThunk } from "@/store/artistSlice/artistThunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { extractFile } from "@/utils/extract-file";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "@/routes/app-routes";
import type { ArtistFormType } from "@/types/artist/artist-form.types";

const useArtistForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const { isSending } = useAppSelector((state) => state.artist);

    const handleAdd = async (data: ArtistFormType) => {
        const formData = new FormData();

        const { name, info, photo } = data;

        formData.append("name", name);
        formData.append("info", info);

        const file = extractFile(photo);

        if (file) {
            formData.append("photo", file);
        }

        await dispatch(addArtistThunk(formData)).unwrap();

        form.resetFields();

        navigate(appRoutes.ARTISTS_PAGE);
    };

    return {
        form,
        handleAdd,
        isSending,
    };
};

export default useArtistForm;
