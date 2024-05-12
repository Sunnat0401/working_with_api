import React, { useState } from 'react';

function DeleteConfirmation() {
    const [showModal, setShowModal] = useState(false);

    const openDeleteModal = () => {
        setShowModal(true);
    };

    const confirmDelete = () => {
        // Add your deletion logic here
        alert("Deleted!");
        setShowModal(false);
    };

    const cancelDelete = () => {
        setShowModal(false);
    };

    return (
        <div>
            <button onClick={openDeleteModal}>Delete</button>

            {/* Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete?</p>
                        <button onClick={confirmDelete}>Yes</button>
                        <button onClick={cancelDelete}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteConfirmation;
