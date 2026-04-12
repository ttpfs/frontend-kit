import React from "react";

type UseCopyOptions = {
	resetAfter?: number; // ms
	onCopy?: (text: string) => void;
};

export const useCopy = (options?: UseCopyOptions) => {
	const { resetAfter = 2000, onCopy } = options || {};

	const [copied, setCopied] = React.useState(false);
	const timeoutRef = React.useRef<number | null>(null);

	const copy = React.useCallback(
		async (text: string) => {
			if (!text) return false;

			try {
				await navigator.clipboard.writeText(text);

				setCopied(true);

				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
				}

				timeoutRef.current = window.setTimeout(() => {
					setCopied(false);
				}, resetAfter);

				onCopy?.(text);

				return true;
			} catch (err) {
				console.error("Copy failed:", err);
				return false;
			}
		},
		[resetAfter, onCopy],
	);

	React.useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return {
		copied,
		copy,
	};
};
