import Modal from "@mui/material/Modal";
import CloseIcon from '@mui/icons-material/Close';
import { useCallback, useState } from "react";

export default function HomeModal({ data }: Record<string, any>) {
    const { landingBanner } = data.website;
    const [showModal, setShowModal] = useState(true);

    const handleCloseModal = useCallback(() => {
        setShowModal((prev) => !prev);
    }, [showModal])

    return (
        <Modal
            open={showModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="w-full h-full flex justify-center items-center relative"
        >
            <div className="flex justify-center items-center">
                <div onClick={handleCloseModal} className="w-[30px] h-[30px] flex justify-center cursor-pointer items-center rounded-full absolute border top-[20px] right-[20px] border-white border-solid">
                    <CloseIcon className="w-8 h-8 text-white"/>
                </div>
                <div className="w-full md:w-[700px] h-auto bg-white border-none flex justify-center items-center">
                    <img src={landingBanner.bannerImage} alt='banner'/>
                </div>
            </div>
        </Modal>
    );
}