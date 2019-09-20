// Toggle button

const toggleButton = document.querySelector('#toggle-button');

toggleButton.addEventListener('click', () => {
    const pressed = toggleButton.getAttribute('aria-pressed') === 'true';
    toggleButton.setAttribute('aria-pressed', !pressed);
});

// Toggle button with label change

toggleButtonWithLabelChange = document.querySelector('#toggle-button-with-label-change');

toggleButtonWithLabelChange.addEventListener('click', () => {
    const previousText = toggleButtonWithLabelChange.innerText;
    toggleButtonWithLabelChange.innerText = previousText.toUpperCase() === 'PLAY' ? 'Pause' : 'Play';
    
    // Doesn't seem to be necessary in VO
    document.documentElement.tabIndex = -1;
    document.documentElement.focus();
    toggleButtonWithLabelChange.focus();
});

// Play pause button

function VisualPlayPauseButton($module) {
    this.$module = $module;
}

VisualPlayPauseButton.prototype.init = function() {
    this.$playModule = this.$module.querySelector('.visual-play-pause-button__play');
    this.$pauseModule = this.$module.querySelector('.visual-play-pause-button__pause');

    this.updateView();

    this.$module.addEventListener('click', () => {
        const newState = this.getPlayingPausedState() === 'paused' ? 'playing' : 'paused';
        this.setPlayingPausedState(newState);
        this.updateView();
    });
}

VisualPlayPauseButton.prototype.getPlayingPausedState = function() {
    const state = this.$module.dataset.state.toLowerCase();
    if (state === 'paused' || state === 'playing') {
        return state
    } else {
        throw new Error(`$visualPlayPauseButton.dataset.state is invalid. It is currently "${$visualPlayPauseButton.dataset.state}". It should be "paused" or "playing"`);
    }
}

VisualPlayPauseButton.prototype.setPlayingPausedState = function(newState) {
    if (newState !== 'paused' && newState !== 'playing') {
        return false;
    }

    this.$module.dataset.state = newState;
}

VisualPlayPauseButton.prototype.updateView = function() {
    if (this.getPlayingPausedState() === 'paused') {
        this.$playModule.hidden = false;
        this.$pauseModule.hidden = true;
    } else if (this.getPlayingPausedState() === 'playing') {
        this.$playModule.hidden = true;
        this.$pauseModule.hidden = false;
    } else {
        throw new Error();
    }
}

const visualPlayPauseButton = new VisualPlayPauseButton(
    document.querySelector('#visual-play-pause-button')
);
visualPlayPauseButton.init();

// Switch button (external labelling)

function SwitchButton($module) {
    this.$module = $module;
}

// Init
SwitchButton.prototype.init = function() {

    this.$module.addEventListener('click', () => {
        const previousState = this.$module.getAttribute('aria-checked');
        const newState = previousState === 'true' ? 'false' :'true';
        this.$module.setAttribute('aria-checked', newState);
    });
}

const switchButtons = document.querySelectorAll('[data-module="switch-button"]');

Array.prototype.forEach.call(switchButtons, $switchButton => {
    const switchButton = new SwitchButton($switchButton);
    switchButton.init();
});
