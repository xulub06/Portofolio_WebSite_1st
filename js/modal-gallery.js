document.querySelectorAll('.portfolio-modal:not(.three-d-modal)').forEach((modal) => {
    const body = modal.querySelector('.modal-body');
    const title = body && body.querySelector('h2');
    const media = body && body.querySelector('img, video');
    const description = body && body.querySelector('p');
    const closeButton = modal.querySelector('.modal-content > .close');

    if (!body || !title || !media || !description || !closeButton) {
        console.error(`No se pudo preparar el modal "${modal.id}".`);
        return;
    }

    modal.classList.add('three-d-modal');
    modal.querySelector('.modal-dialog').classList.add('modal-dialog-centered');

    const titleId = title.id || `${modal.id}Title`;
    const captionId = `${modal.id}Caption`;
    title.id = titleId;
    title.className = 'three-d-modal__title';
    modal.setAttribute('aria-labelledby', titleId);

    media.classList.remove('img-fluid', 'rounded', 'mb-5', 'w-100');

    const figure = document.createElement('figure');
    figure.className = 'three-d-modal__figure';

    const caption = document.createElement('figcaption');
    caption.className = 'three-d-modal__caption';
    caption.id = captionId;
    caption.hidden = true;

    const toggle = document.createElement('button');
    toggle.className = 'three-d-modal__toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-controls', captionId);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Mostrar texto';

    const previous = document.createElement('button');
    previous.className = 'three-d-modal__nav three-d-modal__nav--previous';
    previous.type = 'button';
    previous.dataset.modalStep = '-1';
    previous.setAttribute('aria-label', 'Proyecto anterior');
    previous.innerHTML = '<i class="fas fa-chevron-left" aria-hidden="true"></i>';

    const next = document.createElement('button');
    next.className = 'three-d-modal__nav three-d-modal__nav--next';
    next.type = 'button';
    next.dataset.modalStep = '1';
    next.setAttribute('aria-label', 'Proyecto siguiente');
    next.innerHTML = '<i class="fas fa-chevron-right" aria-hidden="true"></i>';

    closeButton.classList.add('three-d-modal__close');
    closeButton.setAttribute('aria-label', 'Cerrar imagen');
    caption.append(title, description);
    figure.append(media, closeButton, toggle, previous, next, caption);
    body.replaceChildren(figure);

    modal.querySelectorAll('[data-dismiss="modal"]:not(.close)').forEach((button) => button.remove());
    window.jQuery(modal).on('hidden.bs.modal', () => {
        modal.querySelectorAll('video').forEach((video) => {
            video.pause();
            video.currentTime = 0;
        });
    });
});
