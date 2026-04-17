import { type PropsWithChildren } from "react";
import {
	FormProvider as BaseFormProvider,
	type FieldValues,
	type UseFormReturn,
} from "react-hook-form";

interface FormProviderProps<TFieldValues extends FieldValues>
	extends PropsWithChildren,
		React.FormHTMLAttributes<HTMLFormElement> {
	form: UseFormReturn<TFieldValues>;
}

export const FormProvider = <TFieldValues extends FieldValues>(
	props: FormProviderProps<TFieldValues>,
) => {
	const { children, form } = props;

	return <BaseFormProvider {...form}>{children}</BaseFormProvider>;
};
