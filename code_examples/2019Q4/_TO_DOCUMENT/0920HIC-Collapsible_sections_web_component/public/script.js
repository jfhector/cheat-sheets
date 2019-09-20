function IDGenerator() {
	 
    this.length = 10;
    this.timestamp = +new Date;
    
    var _getRandomInt = function( min, max ) {
       return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }
    
    this.generate = function() {
        var ts = this.timestamp.toString();
        var parts = ts.split( "" ).reverse();
        var id = "";
        
        for( var i = 0; i < this.length; ++i ) {
           var index = _getRandomInt( 0, parts.length - 1 );
           id += parts[index];	 
        }
        
        return id;
    }   
}
const idGen = new IDGenerator();

if ('content' in document.createElement('template')) {
    if (document.head.attachShadow) {

        class ToggleSection extends HTMLElement {
            constructor() {
                super();

                // Getting a unique id

                this.uniqueId = idGen.generate();

                // Creating the template
        
                const template = document.createElement('template');
                template.innerHTML = `
                    <h2 id="header-${this.uniqueId}">
                        <button type="button" aria-expanded='false'>
                            <svg viewBox="0 0 10 10" focusable="false">
                                <rect height="2" y="4" x="1" width="8"/>
                                <rect class="plus-sign__vertical-stroke" width="2" x="4" y="1" height="8"/>
                            </svg>
                        </button>
                    </h2>
        
                    <div hidden>
                        <slot></slot>
                    </div>
        
                    <style>
                        * {
                            box-sizing: border-box;
                        }

                        h2 {
                            margin-top: 0;
                            margin-bottom: 0;
                        }

                        button[aria-expanded] {
                            all: inherit;  /* What's another IE-compatible way to do this? */
                            width: 100%; /* Is this really needed? */
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 1rem;
                        }
        
                        button[aria-expanded] > svg {
                            fill: currentColor;
                            width: 2rem;
                            height: 2rem;
                        }
        
                        button[aria-expanded]:focus > svg {
                            outline: 2px solid blueviolet;
                        }
        
                        button[aria-expanded="true"] > svg > rect.plus-sign__vertical-stroke {
                            display: none;
                        }

                        h2 + div {
                            padding-left: 1rem;
                            padding-right: 1rem;
                        }
                    </style>
                `;

                // Creating the shadowRoot, and populating it with the content of the template
        
                this.attachShadow({ mode: 'open' });
                this.shadowRoot.appendChild(
                    template.content.cloneNode(true)
                );

                // Making changes to the toggle-section attributes

                this.setAttribute('role', 'region');
                this.setAttribute('aria-labelledby', `header-${this.uniqueId}`);

                // Getting references to light DOM and shadow DOM elements

                this.$lightDomHeading = this.querySelector('h2:first-child, h3:first-child, h4:first-child, h5:first-child, h6:first-child');
                this.$shadowDomHeading = this.shadowRoot.querySelector('h2:first-child, h3:first-child, h4:first-child, h5:first-child, h6:first-child');
                console.log('This looks like a bug in Safari, when using :first-child in a quereSelector on a shadowRoot:');
                console.log('$lightDomHeading', this.$lightDomHeading);
                console.log('$shadowDomHeading', this.$shadowDomHeading);
                
                if (!this.$lightDomHeading) { return console.warn("The first element within each toggle-section must be a heading of an appropriate level.") }
                this.$shadowDomToggleButton = this.shadowRoot.querySelector('button[aria-expanded]');
                this.$shadowDomContentDiv = Array.prototype.filter.call(this.shadowRoot.children, $child => $child.matches('div'))[0];

                // Moving elements from the lightDOM to the shadow DOM

                this.$shadowDomToggleButton.innerHTML = this.$lightDomHeading.textContent + this.$shadowDomToggleButton.innerHTML;
                this.$lightDomHeading.parentElement.removeChild(this.$lightDomHeading);
                
                // Detect the heading of the header within the slot, and update the level of the heading in the shadow DOM accordingly

                const levelOfHeadingInLightDom = parseInt(this.$lightDomHeading.tagName.substring(1));
                if (levelOfHeadingInLightDom !== 2) {
                    this.$shadowDomHeading.setAttribute('aria-level', levelOfHeadingInLightDom);
                }

                // Creating a click event handler on the button to update the 'open' attribute

                this.$shadowDomToggleButton.addEventListener('click', (e) => {
                    e.stopPropagation();

                    const currentOpenState = this.getAttribute('open');
                    const newOpenState = currentOpenState === 'true' ? 'false' : 'true';
                    this.setAttribute('open', newOpenState);
                });
            }

            static get observedAttributes() {
                return ['open'];
            }

            attributeChangedCallback(attributeName, oldOpenState, newOpenState) {
                if (attributeName === 'open') {
                    this.toggleSection(newOpenState);
                }
            }

            toggleSection(newOpenState) {
                this.$shadowDomToggleButton.setAttribute('aria-expanded', newOpenState);
                this.$shadowDomContentDiv.hidden = newOpenState === 'true' ? false : true; // Note: Be careful to pass a boolean to HTMLElement.hidden. "false" is truthy!!
            }
        }

        customElements.define('toggle-section', ToggleSection);
    }
}

