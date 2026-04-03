import { type FieldValues, type UseFormReturn } from "react-hook-form";
import { type UseFormSubmitOptions } from "@/types";

export function useFormSubmit<
	TValues extends FieldValues,
	// biome-ignore lint/suspicious/noExplicitAny: <>
	TSuccess extends Record<string, any> = Record<string, any>,
	TError extends Error = Error,
>(
	form: UseFormReturn<TValues>,
	options: UseFormSubmitOptions<TValues, TSuccess, TError>,
) {
	const { onValid, onError, onInvalid, onSuccess } = options;

	const handleSubmit = form.handleSubmit(
		async (values) => {
			try {
				const result = await onValid(values);
				if (typeof result === "object") {
					onSuccess?.(result);
				}
				onSuccess?.();
			} catch (error) {
				const baseError = error as TError;
				onError?.(baseError);
			}
		},
		async (error, e) => onInvalid?.(error, e),
	);

	return { handleSubmit };
}
