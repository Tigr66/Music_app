import { setupApp } from "./app";
import { initMinio } from "./lib/minio";

const PORT = 8000;

const bootstrap = async () => {
    await initMinio();

    const app = setupApp();

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};

bootstrap();
