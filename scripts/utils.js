export const openModal = (modal) => {
    modal.style.display = 'flex';
    document.addEventListener('keydown', handleEscapeKey);
};

export const closeModal = (modal) => {
    modal.style.display = 'none';
    document.removeEventListener('keydown', handleEscapeKey);
};

export const handleEscapeKey = (evt) => {
    if (evt.key === 'Escape') {
        const openedModal = document.querySelector('.modal-overlay[style*="flex"]');
        if (openedModal) {
            closeModal(openedModal);
        }
    }
};

export const handleOverlayClick = (modal, evt) => {
    if (evt.target === modal) {
        closeModal(modal);
    }
};
