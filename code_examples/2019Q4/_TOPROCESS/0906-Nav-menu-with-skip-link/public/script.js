const primaryNavButton = document.querySelector('.js-primary-nav__menu-button');
const primaryNavLinkList = document.querySelector('#primary-nav-links-list');

primaryNavButton.hidden = false;

primaryNavButton.addEventListener('click', function(e) {
    e.stopPropagation();
    const currentExpandedState = this.getAttribute('aria-expanded');
    const newExpandedState = currentExpandedState === 'false' ? 'true' : 'false';
    this.setAttribute('aria-expanded', newExpandedState);

});