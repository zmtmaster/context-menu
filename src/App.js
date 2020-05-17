import React, { useRef } from 'react';
import styled from 'styled-components';

import MyComponent from './components/MyComponent';
import { OutsideContext } from './contexts';

const Container = styled.div`
	text-align: center;
	background-color: #282c34;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: calc(10px + 2vmin);
	color: white;
`;

export default function App() {
	const containerRef = useRef(null);

	return (
		<Container ref={containerRef}>
			<OutsideContext.Provider value={containerRef}>
				<MyComponent />
			</OutsideContext.Provider>
		</Container>
	);
}
