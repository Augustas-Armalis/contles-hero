import { useEffect } from 'react';
import Lenis from 'lenis';

if (typeof window !== 'undefined' && typeof window.lenisInstance === 'undefined') {
	window.lenisInstance = null;
}

export default function LenisProvider({ children }) {
	useEffect(() => {
		const isTouchDevice = () => {
			return (
				'ontouchstart' in window ||
				navigator.maxTouchPoints > 0 ||
				window.matchMedia?.('(pointer: coarse)').matches
			);
		};

		// Treat small viewports as "mobile" as well (e.g., devtools mobile preview).
		const isSmallScreen =
			typeof window !== 'undefined' &&
			window.matchMedia?.('(max-width: 768px)').matches;

		// Only enable Lenis on larger, non-touch-like devices (desktop).
		if (isTouchDevice() || isSmallScreen) {
			return;
		}

		const lenis = new Lenis({
			autoRaf: false,
			smoothWheel: true,
			orientation: 'vertical',
			gestureOrientation: 'vertical',
			lerp: 0.1
		});

		// Expose globally if needed elsewhere
		window.lenisInstance = lenis;

		// Restore scroll position
		const scrollPosition = sessionStorage.getItem('scrollPosition') || '0';
		window.scrollTo(0, parseInt(scrollPosition));

		// Save scroll position before unload
		const handleBeforeUnload = () => {
			sessionStorage.setItem('scrollPosition', window.scrollY.toString());
		};
		window.addEventListener('beforeunload', handleBeforeUnload);

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);

		return () => {
			window.lenisInstance = null;
			lenis.destroy();
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	return <>{children}</>;
}
