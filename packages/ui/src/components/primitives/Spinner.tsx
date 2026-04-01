import { Spinner as BaseSpinner, type SpinnerRootProps } from "@heroui/react";

const Spinner: React.FC<SpinnerRootProps> = ({ ...props }) => {
	return (
		<div className="flex items-center justify-center gap-4">
			<BaseSpinner {...props}>{props.children}</BaseSpinner>
		</div>
	);
};

export { Spinner };
