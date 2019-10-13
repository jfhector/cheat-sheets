(function(window, document) {

    toggleTips = document.querySelectorAll('[data-module="toggle-tip"]');
    Array.prototype.forEach.call(toggleTips, toggleTip => {
        const $toggleButton = toggleTip.querySelector('button[data-toggle-tip-content]');
        const toggleTipContent = $toggleButton.dataset.toggleTipContent;
        const $liveRegion = toggleTip.querySelector('[role="status"]');
    
        function show() {
            $liveRegion.innerHTML = '';
            setTimeout(() => {
                $liveRegion.innerHTML = `<span">${toggleTipContent}</span>`;
            }, 100);
        }

        function hide() {
            $liveRegion.innerHTML = '';
        }
    
        $toggleButton.addEventListener('click', (e) => {
            show();
            e.stopPropagation();
        });
    
        $toggleButton.addEventListener('blur', (e) => {
            hide();
            e.stopPropagation();
        });
    
        document.addEventListener('click', (e) => {
            if (!$toggleButton.contains(e.target)) {
                hide();
                e.stopPropagation();
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                hide();
            }
        });
    });

})(window, document)
