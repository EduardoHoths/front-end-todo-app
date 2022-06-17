import React from "react";
import "./style.scss";

interface ModalProps {
    children: React.ReactNode;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal = ({ children, showModal, setShowModal }: ModalProps) => {
    function closeModal({target, currentTarget}: React.MouseEvent): void {
        if(target === currentTarget) {
            setShowModal(false);
        }
        
    }
    return (
        <>
            {showModal && (
                <div onClick={closeModal} className="fade">
                    <div className="modal">
                        <h2>Editar Tarefa</h2>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};
