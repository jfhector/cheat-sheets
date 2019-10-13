(function(window, document){
    // BROWSER SUPPORT/BUG: Safari (and maybe others) don't support matchMedia well if the value is not in pixels
    // let mql = matchMedia('(min-width: 37.5rem)');
    let mql = matchMedia('(min-width: 600px)');

    const tabInterfaces = document.querySelectorAll('[data-module="tab-interface"]');
    Array.prototype.forEach.call(tabInterfaces, ($tabInterface) => {
        
        if (mql.matches) {

            // References

            const $tabList = $tabInterface.querySelector('ul');
            const listItems = Array.prototype.filter.call($tabList.children, child => child.matches('li'));
            const tabs = $tabList.querySelectorAll('a[id$="-tab"]');
            const tabPanels = $tabInterface.querySelectorAll('section[id$="-panel"]');

            // Augmenting the markup to a tablist

            $tabList.setAttribute('role', 'tablist');
            
            Array.prototype.forEach.call(listItems, $listItem => $listItem.setAttribute('role', 'presentation'));
            
            Array.prototype.forEach.call(tabs, ($tab, index) => {
                $tab.setAttribute('role', 'tab');
                $tab.setAttribute('aria-controls', `section-${index + 1}-panel`);
                
                // Add 'aria-selected', set to false, except for the first one
                $tab.setAttribute('aria-selected', false);
                tabs[0].setAttribute('aria-selected', true);

                // Set tabindex="-1" on all except the first one
                $tab.setAttribute('tabindex', -1);
                tabs[0].removeAttribute('tabindex');
            });

            Array.prototype.forEach.call(tabPanels, $tabPanel => {
                $tabPanel.setAttribute('role', 'tabpanel');
                
                // Hide all, except the first one
                $tabPanel.hidden = true;
                tabPanels[0].hidden = false;
            });
            
            // Event listeners

            Array.prototype.forEach.call(tabs, ($tab, index) => {
                $tab.addEventListener('click', (e) => {
                    selectTab($tab);
                    e.stopPropagation();
                    e.preventDefault();  // Note: this is to follow the ARIA-APG pattern. The heydon pattern would let the link move users to the section
                });

                // tab on keyup
                $tab.addEventListener('keyup', (e) => {
                    if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {

                        // Note: we are following the automatic selection pattern
                        let $tabToSelectNext;
        
                        // if key code is ArrowLeft
                        if (e.code === 'ArrowLeft') {
                            // if tab is firstElementChild: nextSelectedTab is the last one
                            // if not, nextSelectedTab is the previous one
                            if (index === 0) {
                                $tabToSelectNext = tabs[(tabs.length - 1)];
                            } else {
                                $tabToSelectNext = tabs[(index - 1)];
                            }
                        }
        
                        // if key code is ArrowRight
                        if (e.code === 'ArrowRight') {
                            // if tab if lastElementChild: nextSelectedTab is the first one
                            // if not, nextSelectedTab is the next one
                            if (index === (tabs.length - 1)) {
                                $tabToSelectNext = tabs[0];
                            } else {
                                $tabToSelectNext = tabs[(index + 1)];
                            }
                        }
                        if ($tabToSelectNext) {
                            selectTab($tabToSelectNext);
                        }

                        // !!!! how to find an index from a NodeList using indexOf!!!!!!
                        // Note: instead of getting the index from forEach, I could I got it from:
                        // const index = Array.prototype.indexOf.call(tabs, e.currentTarget);
                    }
                });
            });

            function selectTab($tabToSelect) {
                // Set tabindex="-1" on all tabs, except on $tabToSelect, where tabindex needs to be removed
                // Set aria-selected to false on all tabs, except on $tabToSelect, where it needs to be true
                Array.prototype.forEach.call(tabs, $tab => {
                    $tab.setAttribute('tabindex', -1);
                    $tab.setAttribute('aria-selected', false);
                });
                $tabToSelect.removeAttribute('tabindex');
                $tabToSelect.setAttribute('aria-selected', true);

                // Focus on $tabToSelect
                $tabToSelect.focus();

                // Remove the tabindex attribute on all tabPanels, except the one that corresponds to $tabToSelect, which takes tabindex="0"
                // Add hidden on all tabPanels, except the one that corresponds to $tabToSelect, which gets hidden=false
                Array.prototype.forEach.call(tabPanels, ($tabPanel) => {
                    $tabPanel.removeAttribute('tabindex');
                    $tabPanel.hidden = true;
                });

                const idOfTabPanelControlledByTheTabToSelect = $tabToSelect.getAttribute('aria-controls');
                const tabPanelControlledByTheTabToSelect = document.getElementById(idOfTabPanelControlledByTheTabToSelect);
                tabPanelControlledByTheTabToSelect.setAttribute('tabindex', 0);
                tabPanelControlledByTheTabToSelect.hidden = false;
            }
        }
    });
    
})(window, document)