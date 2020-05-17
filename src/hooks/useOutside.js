import { useEffect } from 'react';

export default function useOutside(
	containerRef,
	contextMenuRef,
	callback = () => {}
) {
	/**
	 * if clicked on outside of element
	 */
	function handleClickOutside(event) {
		if (
			containerRef?.current?.contains(event.target) &&
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
