import { type PropsWithChildren } from "react";
import {
	FormProvider as BaseFormProvider,
	type FieldValues,
	type UseFormReturn,
} from "react-hook-form";

interface FormProviderProps<TFieldValues extends FieldValues>
	extends PropsWithChildren {
	form: UseFormReturn<TFieldValues>;
	onSubmit: () => Promise<void> | void;
}

export const FormProvider = <TFieldValues extends FieldValues>(
	props: FormProviderProps<TFieldValues>,
) => {
	const { children, form, onSubmit } = props;

	return (
		<BaseFormProvider {...form}>
			<form onSubmit={onSubmit}>{children}</form>
		</BaseFormProvider>
	);
};
