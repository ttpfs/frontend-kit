import { Button, type ButtonProps } from "@ttpfs/ui-react";
import type React from "react";
import { type PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";

interface Props extends PropsWithChildren, ButtonProps {}

export const FormSubmitButton: React.FC<Props> = (props) => {
	const { children, ...rest } = props;

	const {
		formState: { isSubmitting },
	} = useFormContext();

	return (
		<Button
			isDisabled={isSubmitting}
			isPending={isSubmitting}
			type="submit"
			{...rest}
		>
			{children}
		</Button>
	);
};
