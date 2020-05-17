import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { OutsideContext } from '../../contexts';
import { useOutside } from '../../hooks';

const ContextMenuContainer = styled.div`
	position: absolute;
	background: red;
	z-index: 1;
	box-shadow: 0 0 2px 2px black;
	${(props) => `
    top: ${props.top || 0}px;
    left: ${props.left || 0}px;
  `}
`;

function ContextMenu({ children, top, left, close }) {
	const outerRef = useContext(OutsideContext);
	const contextMenuRef = useRef(null);

	useOutside(outerRef, contextMenuRef, close);

	return (
		<ContextMenuContainer ref={contextMenuRef} top={top} left={left}>
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
