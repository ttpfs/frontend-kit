import {
	type UseFormProps as BaseUseFormProps,
	type UseFormReturn as BaseUseFormReturn,
	type FieldErrors,
	type FieldValues,
} from "react-hook-form";
import { type ZodType, type z } from "zod";

interface UseFormProps<TSchema extends ZodType<FieldValues, FieldValues>> {
	schema: TSchema;
	options?: Omit<BaseUseFormProps<z.infer<TSchema>>, "resolver">;
}

interface UseFormReturn<TValues extends FieldValues>
	extends BaseUseFormReturn<TValues> {}

interface UseFormSubmitOptions<
	TValues extends FieldValues,
	// biome-ignore lint/suspicious/noExplicitAny: <>
	TSuccess extends Record<string, any> = TValues,
	TError extends Error = Error,
> {
	onValid: (values: TValues) => Promise<void> | void;
	onInvalid?: (
		errors: FieldErrors<TValues>,
		event?: React.BaseSyntheticEvent,
	) => Promise<void> | void;

	onSuccess?: (data: TSuccess) => void;
	onError?: (error: TError) => void;
}

export type { UseFormProps, UseFormReturn, UseFormSubmitOptions };
