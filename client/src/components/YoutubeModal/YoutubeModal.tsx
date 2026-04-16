import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setCurrentTrack } from "../../store/musicSlice/musicSlice";
import { CloseOutlined } from "@ant-design/icons";

const YoutubeModal = () => {
    const dispatch = useAppDispatch();
    const track = useAppSelector((state) => state.music.currentTrack);

    return (
        <Modal
            title={track ? track.title : ""}
            open={track !== null}
            closeIcon={<CloseOutlined style={{ color: "#dcdadb" }} />}
            onCancel={() => dispatch(setCurrentTrack(null))}
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
