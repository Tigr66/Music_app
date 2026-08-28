import { Bounce, ToastContainer } from "react-toastify";

const AppToastContainer = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
        />
    );
};

export default AppToastContainer;
