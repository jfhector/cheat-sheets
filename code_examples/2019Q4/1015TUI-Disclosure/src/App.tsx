import React from 'react';
import './App.scss';
import { Disclosure, DisclosureTrigger, DisclosureTarget } from './components/Disclosure/Disclosure';

const App: React.FC = () => {
  return (
    <div className="App">
      <div>
        <Disclosure>
          <DisclosureTrigger className='Disclosure__trigger-button'>Expand / Collapse</DisclosureTrigger>

          <DisclosureTarget>
              <p>Lots of content of content of content of content of content of content of content of content of content of content</p>
          </DisclosureTarget>
        </Disclosure>
      </div>

      <div>
        <Disclosure>
          <DisclosureTrigger>{expanded => expanded ? 'collapse' : 'expand'}</DisclosureTrigger>

          <DisclosureTarget>
              <p>Lots of marketing bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</p>
          </DisclosureTarget>
        </Disclosure>
      </div>
    </div>
  );
}

export default App;
