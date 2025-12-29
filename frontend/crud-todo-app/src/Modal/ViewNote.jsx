import "./modal.css";

// icons
import { MdClose } from "react-icons/md";

// theme store
import { themeStore } from "../store/manyStore";
import { modalOpenner } from "../store/manyStore";

const ViewNote = ({ isOpen, isClose, description, title }) => {
  if (!isOpen) return null;

  const isDark = themeStore((state) => state.isDark);
  const closeViewModal = modalOpenner((state) => state.closeViewModal);

  return (
    <div
      onClick={() => closeViewModal()}
      className={`fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-start p-5 ${
        isDark ? "bg-white/30 text-black" : "bg-black/30 text-white"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-[90%] md:w-1/2 p-5 rounded-lg max-h-[90vh] overflow-y-auto hide-scrollbar mt-2 ${
          isDark ? "bg-black/50 text-white" : "bg-white/20 text-black"
        }`}
      >
        <h2 className="text-2xl mb-3">{title}</h2>
        <MdClose
          size={30}
          className="absolute top-5 right-2.5 hover:scale-110 duration-150"
          onClick={isClose}
        />
        <p className="whitespace-pre-wrap">{description}</p>
      </div>
    </div>
  );
};

export default ViewNote;
