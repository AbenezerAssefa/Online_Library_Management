import './Modal.css';

interface ModalProps {
  toggleModal () : void; // Corrected type for the function
  content: JSX.Element;   // Corrected property name capitalization
}

export const Modal: React.FC<ModalProps> = ({ toggleModal, content }) => {
  return (
    <div className="modal-bg">
      <div className="modal">
        <h5 className="modal-exit" onClick={toggleModal}>
          ✖
        </h5>
        {content}
      </div>
    </div>
  );
};
