import React from "react";
import { useCopy } from "./useCopy";

type UseSnippetParams = {
	children: React.ReactNode;
	codeString?: string;
	disableCopy?: boolean;
	onCopy?: (value: string) => void;
};

export const useSnippet = ({
	children,
	codeString,
	disableCopy,
	onCopy,
}: UseSnippetParams) => {
	const { copied, copy } = useCopy({
		onCopy,
	});

	const textToCopy = React.useMemo(() => {
		if (codeString) return codeString;

		if (Array.isArray(children)) {
			return children.join("\n");
		}

		return String(children);
	}, [children, codeString]);

	const handleCopy = React.useCallback(() => {
		if (disableCopy) return;
		copy(textToCopy);
	}, [disableCopy, copy, textToCopy]);

	return {
		copied,
		handleCopy,
		textToCopy,
	};
};
