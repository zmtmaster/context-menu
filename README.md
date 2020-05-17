## Context Menu using hooks & context only

This complete code is can be found on [github](https://github.com/zmtmaster/context-menu)

A demo a application can be found on [Heroku](https://context-menu.herokuapp.com/)

![alt text](./docs/images/0.png 'Sample 1')

### Contact

![Follow @twitter](./docs/images/twitter.png 'twitter') [Follow me on twitter @MatanKastel](https://twitter.com/matankastel)

### Instructions

1. Create a custom hook to bind the mousedown listener

```

import { useEffect } from 'react';

function useOutside(containerRef, contextMenuRef, callback = () => {}) {
  /**
   * if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (containerRef?.current?.contains(event.target) &&
     !contextMenuRef?.current?.contains(event.target)
    ) {
      callback();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}

export default useOutside;
```

2. Create a context to hold the references as value

```
import { createContext } from 'react';

const OutsideContext = createContext(null);

export default OutsideContext;
```

3. Create a context-menu component that uses the context & the custom hook. It a container that wraps the items together, it may has some styling.

```
import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { OutsideContext } from 'app/contexts';
import { useOutside } from 'app/hooks';

const ContextMenuContainer = styled.div`
  position: absolute;
  z-index: 1;

  ${(props) => `
    top: ${props.top || 0}px;
    left: ${props.left || 0}px;
  `}
`;

function ContextMenu({
  children, top, left, close,
}) {
  const outerRef = useContext(OutsideContext);
  const contextMenuRef = useRef(null);

  useOutside(outerRef, contextMenuRef, close);

  return (
    <ContextMenuContainer
      ref={ contextMenuRef }
      top={ top }
      left={ left }
    >
      {children}
    </ContextMenuContainer>
  );
}

ContextMenu.propTypes = {
  children: PropTypes.node,
  top: PropTypes.number,
  left: PropTypes.number,
  close: PropTypes.func,
};

ContextMenu.defaultProps = {
  children: null,
  top: 0,
  left: 0,
  close: () => {},
};

export default ContextMenu;
```

4. Add Provider to the containerRef. MyComponent is implemented on the next step.

```
import React, { useRef } from 'react';
import MyComponent from 'app/components/my-component';

function App() {
 const containerRef = useRef(null);

  return (
    <div ref={ containerRef }>
      <OutsideContext.Provider value={ containerRef }>
        <MyComponent />
      </<OutsideContext.Provider>
    </div>
  );
}
```

5. Render the Context-Menu component

```
import React, { useState, useCallback } from 'react';

export default function MyComponent() {
  const [contextMenuProperties, setContextMenuProperties] = useState({
    contextMenuVisibility: false,
    contextMenuTop: 0,
    contextMenuLeft: 0,
  });

  const onClose = useCallback(() => {
    setContextMenuProperties({
      contextMenuVisibility: false,
      contextMenuTop: 0,
      contextMenuLeft: 0,
    });
  }, [setContextMenuProperties]);

  const onRightClick = useCallback(({ event, selection }) => {
    setContextMenuProperties({
      contextMenuVisibility: true,
      contextMenuTop: event.clientY,
      contextMenuLeft: event.clientX,
    });
  }, [setContextMenuProperties]);

  return (
    <div>
      <span> some content </span>
      {
        contextMenuVisibility && (
          <ContextMenuContainer
            top={ contextMenuTop }
            left={ contextMenuLeft }
            close={ onClose }
          >
            <div onClick={ onClose }> Item 1 </div>
            <div onClick={ onClose }> Item 2 </div>
          </ContextMenuContainer>
        )
      }
      <div onContextMenu={onRightClick}> some more content that displays the menu </div>
    </div>
  );
}

```

Thanks for reading.
