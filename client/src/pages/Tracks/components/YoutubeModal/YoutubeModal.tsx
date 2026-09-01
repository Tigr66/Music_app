import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import useYoutubeModal from "@/pages/Tracks/hooks/useYoutubeModal";

const YoutubeModal = () => {
    const { track, onCancel } = useYoutubeModal();

    return (
        <Modal
            title={track ? track.title : ""}
            open={track !== null}
            closeIcon={<CloseOutlined style={{ color: "#dcdadb" }} />}
            onCancel={onCancel}
            footer={null}
            destroyOnHidden
        >
            <iframe
                src={track ? track.youtubeUrl : ""}
                width="100%"
                height={300}
            ></iframe>
        </Modal>
    );
};

export default YoutubeModal;
