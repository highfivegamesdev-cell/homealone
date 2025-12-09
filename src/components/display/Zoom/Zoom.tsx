import Modal from "react-modal";
import { twMerge } from "tailwind-merge";

import { useModal } from "@/lib/hooks/useModal";

type Img = {
  image: string;
  alt: string;
};

type Props = {
  className: string;
  trigger: Img;
  objectToZoom: Img;
};

export const Zoom = ({ className, trigger, objectToZoom }: Props) => {
  const {
    isModalOpen: isZoomOpen,
    openModal: openZoom,
    closeModal: closeZoom,
  } = useModal();

  const baseTriggerClass = "absolute hover:cursor-pointer border-transparent";

  return (
    <div>
      <button
        className={twMerge(baseTriggerClass, className)}
        onClick={openZoom}
      >
        <img src={trigger.image} className="w-full h-auto" alt={trigger.alt} />
      </button>

      <Modal
        isOpen={isZoomOpen}
        onRequestClose={closeZoom}
        className="relative overflow-auto max-w-full max-h-full rounded-lg"
        overlayClassName="fixed inset-0 bg-white/50 flex items-center justify-center"
        shouldCloseOnOverlayClick={false}
      >
        <div className="relative p-8 w-64 h-64">
          <button
            onClick={closeZoom}
            className="absolute top-[1%] right-[3%] text-black text-4xl font-bold hover:cursor-pointer"
          >
            ×
          </button>

          <img
            src={objectToZoom.image}
            className="w-full h-auto"
            alt={objectToZoom.alt}
          />
        </div>
      </Modal>
    </div>
  );
};
