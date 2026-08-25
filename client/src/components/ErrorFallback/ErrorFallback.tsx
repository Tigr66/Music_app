import { Button, Result } from "antd";

const ErrorFallback = () => {
    
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <Result
            status="500"
            title="Что-то пошло не так"
            subTitle="Произошла непредвиденная ошибка. Попробуйте обновить страницу."
            extra={
                <Button type="primary" key="console" onClick={handleReload}>
                    Перезагрузить страницу
                </Button>
            }
        />
    );
};

export default ErrorFallback;
