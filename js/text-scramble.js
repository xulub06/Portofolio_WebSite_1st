(() => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const targets = document.querySelectorAll('.text-scramble');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const startAnimations = () => {
        targets.forEach((target) => {
            const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
            const textNodes = [];
            let node;

            while ((node = walker.nextNode())) {
                if (node.textContent.trim()) {
                    textNodes.push({ node, original: node.textContent });
                }
            }

            const originalLength = textNodes.reduce(
                (total, entry) => total + (entry.original.match(/\S/g) || []).length,
                0
            );
            if (!originalLength) {
                return;
            }

            const startTime = performance.now();
            const isFast = target.classList.contains('text-scramble-fast');
            const duration = isFast
                ? Math.max(300, originalLength * 8)
                : Math.max(700, originalLength * 24);

            const animate = (currentTime) => {
                const progress = Math.min((currentTime - startTime) / duration, 1);
                let charactersToReveal = Math.floor(originalLength * progress);

                textNodes.forEach(({ node: textNode, original }) => {
                    let output = '';

                    for (const character of original) {
                        if (/\s/.test(character) || charactersToReveal > 0) {
                            output += character;
                            if (!/\s/.test(character)) {
                                charactersToReveal--;
                            }
                        } else {
                            output += characters[Math.floor(Math.random() * characters.length)];
                        }
                    }

                    textNode.textContent = output;
                });

                if (progress < 1) {
                    window.requestAnimationFrame(animate);
                }
            };

            window.requestAnimationFrame(animate);
        });
    };

    const loader = document.querySelector('#page-loader');
    if (!loader || loader.classList.contains('is-hidden')) {
        startAnimations();
        return;
    }

    const observer = new MutationObserver(() => {
        if (loader.classList.contains('is-hidden')) {
            observer.disconnect();
            startAnimations();
        }
    });

    observer.observe(loader, { attributes: true, attributeFilter: ['class'] });
})();
