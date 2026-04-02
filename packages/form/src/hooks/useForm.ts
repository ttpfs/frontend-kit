import { zodResolver } from "@hookform/resolvers/zod";
import {
	type FieldValues,
	type Resolver,
	useForm as useRhfForm,
} from "react-hook-form";
import { type ZodType, type z } from "zod";
import { type UseFormProps, type UseFormReturn } from "@/types";

export const useForm = <TSchema extends ZodType<FieldValues, FieldValues>>(
	props: UseFormProps<TSchema>,
): UseFormReturn<z.infer<TSchema>> => {
	const { options, schema } = props;

	return useRhfForm<z.infer<TSchema>>({
		...options,
		mode: "all",
		resolver: zodResolver(schema) as Resolver<z.infer<TSchema>>,
		shouldUnregister: false,
	});
};
