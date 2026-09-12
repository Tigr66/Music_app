import { Bounce, ToastContainer } from "react-toastify";

const AppToastContainer = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            theme="colored"
            transition={Bounce}
            draggable
        />
    );
};

export default AppToastContainer;
