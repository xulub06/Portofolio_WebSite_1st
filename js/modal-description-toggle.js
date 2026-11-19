document.querySelectorAll('.three-d-modal__toggle').forEach((toggle) => {
    const caption = document.getElementById(toggle.getAttribute('aria-controls'));

    caption.addEventListener('animationend', (event) => {
        if (event.animationName === 'modal-caption-hide') {
            caption.hidden = true;
            caption.classList.remove('is-hiding');
        }
    });

    toggle.addEventListener('click', () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = 'Mostrar texto';

            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                caption.hidden = true;
            } else {
                caption.classList.add('is-hiding');
            }
            return;
        }

        caption.classList.remove('is-hiding');
        caption.hidden = false;
        toggle.setAttribute('aria-expanded', String(!isExpanded));
        toggle.textContent = 'Ocultar texto';
    });
});
