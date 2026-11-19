const projectModals = Array.from(document.querySelectorAll('.three-d-modal'));

projectModals.forEach((modal) => {
    modal.dataset.navigationReady = 'false';
    window.jQuery(modal).on('show.bs.modal', () => {
        modal.dataset.navigationReady = 'false';
    });
    window.jQuery(modal).on('shown.bs.modal', () => {
        modal.dataset.navigationReady = 'true';
    });
});

document.querySelectorAll('.three-d-modal__nav').forEach((button) => {
    button.addEventListener('click', () => {
        const currentModal = button.closest('.three-d-modal');
        const currentIndex = projectModals.indexOf(currentModal);
        const step = Number(button.dataset.modalStep);

        if (currentIndex === -1 || !Number.isInteger(step) || step === 0) {
            console.error('No se pudo determinar el modal de destino.');
            return;
        }

        if (currentModal.dataset.navigationReady !== 'true') {
            return;
        }

        const nextIndex = (currentIndex + step + projectModals.length) % projectModals.length;
        const nextModal = projectModals[nextIndex];

        currentModal.dataset.navigationReady = 'false';
        window.jQuery(currentModal).one('hidden.bs.modal', () => {
            window.jQuery(nextModal).modal('show');
        });
        window.jQuery(currentModal).modal('hide');
    });
});
