import { Navigate, Outlet } from "react-router-dom";
import { appRoutes } from "../app-routes";
import { useAppSelector } from "@/store/hooks";

const RequireAuth = () => {
    const user = useAppSelector((state) => state.auth.user);

    if (!user) {
        return <Navigate to={appRoutes.LOGIN_PAGE} replace />;
    }

    return <Outlet />;
};

export default RequireAuth;
