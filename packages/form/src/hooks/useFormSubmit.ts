import { type UseFormSubmitOptions } from "@/types";
import { type FieldValues, type UseFormReturn } from "react-hook-form";

export function useFormSubmit<TValues extends FieldValues>(
	form: UseFormReturn<TValues>,
	options: UseFormSubmitOptions<TValues>,
) {
	const { onValid, onError, onInvalid, onSuccess } = options;

	const handleSubmit = form.handleSubmit(
		async (values) => {
			try {
				await onValid(values);
				onSuccess?.(values);
			} catch (error) {
				const baseError = error as Error;
				onError?.(baseError);
			}
		},
		async (error, e) => onInvalid?.(error, e),
	);

	return { handleSubmit };
}
