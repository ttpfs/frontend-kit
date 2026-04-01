import { Button } from "@ttpfs/ui-react";
import type React from "react";
import { type PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";

interface Props extends PropsWithChildren {}

export const FormSubmitButton: React.FC<Props> = (props) => {
	const { children } = props;

	const {
		formState: { isSubmitting },
	} = useFormContext();

	return (
		<Button isDisabled={isSubmitting} isPending={isSubmitting} type="submit">
			{children}
		</Button>
	);
};
