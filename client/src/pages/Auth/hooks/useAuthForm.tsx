import {
    loginUserThunk,
    registerUserThunk,
} from "@/store/authSlice/authThunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "@/routes/app-routes";
import type { AuthFormType } from "@/types/auth/auth-form.types";

const useAuthForm = (isLogin: boolean) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [form] = Form.useForm();

    const isSending = useAppSelector((state) => state.auth.isSending);

    const handleAuth = async (data: AuthFormType) => {
        const user: AuthFormType = {
            username: data.username.trim(),
            password: data.password.trim(),
        };

        if (isLogin) {
            await dispatch(loginUserThunk(user)).unwrap();
        } else {
            await dispatch(registerUserThunk(user)).unwrap();
        }

        form.resetFields();

        navigate({
            pathname: isLogin ? appRoutes.ARTISTS_PAGE : appRoutes.LOGIN_PAGE,
        });
    };

    return { form, isSending, handleAuth };
};

export default useAuthForm;
