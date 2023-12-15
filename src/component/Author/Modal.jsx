import { LoadingProcess } from "../LoadingProcess/LoadingProcess";

const Modal = ({ isOpen, closeModal, onConfirm, loading }) => {
  const handleConfirm = async () => {
    await onConfirm();
    closeModal();
  };
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`} onClick={closeModal}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-4 rounded shadow-lg">
          <p className="mb-4">Are you sure you want to delete this author?</p>
          {loading ? (
            <LoadingProcess />
          ) : (
            <div className="flex justify-end">
              <button className="mr-2 bg-red-500 text-white p-2 rounded" onClick={handleConfirm}>
                Confirm
              </button>
              <button className="bg-gray-500 text-white p-2 rounded" onClick={closeModal}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
