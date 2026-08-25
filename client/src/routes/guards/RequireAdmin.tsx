import { Navigate, Outlet } from "react-router-dom";
import { appRoutes } from "../app-routes";
import { useAppSelector } from "@/store/hooks";

// Это на будущее, сейчас у меня нет роутов только для админов

const RequireAdmin = () => {
    const user = useAppSelector((state) => state.auth.user);

    if (user?.role !== "ADMIN") {
        return <Navigate to={appRoutes.MAIN_PAGE} replace />;
    }

    return <Outlet />;
};

export default RequireAdmin;
