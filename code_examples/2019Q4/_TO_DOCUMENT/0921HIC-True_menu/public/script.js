// const $menuModule = document.querySelector('[data-menu-module]');
const $menuButton = document.querySelector('button[aria-controls="menu"]');
const $menu = document.getElementById('menu');
const $liveRegion = document.querySelector('[role="alert"]');

$menuButton.addEventListener('click', function() {
    toggleMenu();
});

$menuButton.addEventListener('keyup', function(e) {
    if (e.eventPhase === 2) {
        if (e.key === 'ArrowDown') {
            toggleMenu('open');
        }

        if (e.key === 'ArrowUp') {
            toggleMenu('close');
        }
    }
});

Array.prototype.forEach.call($menu.children, $menuItem => {
    $menuItem.addEventListener('click', function(e) {
        const difficultyChangeEvent = new CustomEvent(
            'difficulty-change',
            {
                detail: $menuItem.textContent,
                // Note: bubbles is false by default. Turn it to true!
                bubbles: true,
            }
        );

        // Note: when the event handler above as an arrow function, `this` refered to the window object, and the event would never bubble to $menu.
        this.dispatchEvent(difficultyChangeEvent);
    });

    $menuItem.addEventListener('keyup', function(e) {
        if (e.code === 'ArrowRight' || e.code === 'ArrowDown' || e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
    
            switch (e.code) {
                case 'ArrowRight':
                case 'ArrowDown':
                    const nextElementSibling = $menuItem.nextElementSibling;
                    nextElementSibling ? nextElementSibling.focus() : $menu.firstElementChild.focus();
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                    const previousElementSibling = $menuItem.previousElementSibling;
                    previousElementSibling ? previousElementSibling.focus() : $menu.lastElementChild.focus();
                    break;
            }
        }
    });
});

$menu.addEventListener('difficulty-change', (e) => {
    Array.prototype.forEach.call($menu.children, $menuItem => {
        $menuItem.setAttribute('aria-checked', false);
    });
    e.srcElement.setAttribute('aria-checked', true);

    const newlySelectedDifficultyLevel = e.detail;
    $liveRegion.textContent = `The new difficulty level is ${newlySelectedDifficultyLevel}`;

    $menuButton.focus();
    toggleMenu('close');
});

function toggleMenu(newState) {
    function openMenu() {
        $menuButton.setAttribute('aria-expanded', true);
        $menu.hidden = false;
        const currentlySelectedMenuItemRadio = $menu.querySelector('[aria-checked="true"]');
        currentlySelectedMenuItemRadio.focus();
    }

    function closeMenu() {
        $menuButton.setAttribute('aria-expanded', false);
        $menu.hidden = true;
    }

    if (newState === 'open') {
        openMenu();
    } else if (newState === 'close') {
        closeMenu();
    } else {
        const currentExpandedState = $menuButton.getAttribute('aria-expanded');
        currentExpandedState === 'false' ? openMenu() : closeMenu();
    }
}
