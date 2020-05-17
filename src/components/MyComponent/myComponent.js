import React, { useState, useCallback, memo } from 'react';
import styled from 'styled-components';

import ContextMenu from '../ContextMenu';

const Container = styled.div`
	background: #3b5998;
	color: #fff;
	padding: 2rem;
`;

const Item = styled.div`
	background: red;
	cursor: pointer;
	padding: 1rem;

	&:hover {
		background: #c4a667;
	}
`;

function MyComponent() {
	const [contextMenuProperties, setContextMenuProperties] = useState({
		contextMenuVisibility: false,
		contextMenuTop: 0,
		contextMenuLeft: 0,
	});

	// Hide menu on close
	const onClose = useCallback(() => {
		setContextMenuProperties({
			contextMenuVisibility: false,
			contextMenuTop: 0,
			contextMenuLeft: 0,
		});
	}, [setContextMenuProperties]);

	// Left click on item logic
	const onItemClick = useCallback(
		(text) => {
			alert(text);
			onClose();
		},
		[onClose]
	);

	// Right click logic, prevent default behaviour & set component position
	const onRightClick = useCallback(
		(event) => {
			event.preventDefault();
			setContextMenuProperties({
				contextMenuVisibility: true,
				contextMenuTop: event.clientY,
				contextMenuLeft: event.clientX,
			});
		},
		[setContextMenuProperties]
	);

	const {
		contextMenuTop,
		contextMenuLeft,
		contextMenuVisibility,
	} = contextMenuProperties;

	return (
		<Container>
			<span> some content outside menu, click here when menu is open</span>
			{contextMenuVisibility && (
				<ContextMenu
					top={contextMenuTop}
					left={contextMenuLeft}
					close={onClose}
				>
					<Item onClick={onItemClick.bind(null, 'Item-1')}> Item 1 </Item>
					<Item onClick={onItemClick.bind(null, 'Item-2')}> Item 2 </Item>
				</ContextMenu>
			)}
			<div onContextMenu={onRightClick}>
				some more content that displays the menu
			</div>
		</Container>
	);
}

export default memo(MyComponent);
