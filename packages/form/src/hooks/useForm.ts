import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import {
	type FieldValues,
	type Resolver,
	useForm as useRhfForm,
} from "react-hook-form";
import { type ZodType, type z } from "zod";
import { fieldRegistry } from "@/registry";
import {
	type BoundFields,
	type UseFormProps,
	type UseFormReturn,
} from "@/types";

export const useForm = <TSchema extends ZodType<FieldValues, FieldValues>>(
	props: UseFormProps<TSchema>,
): UseFormReturn<z.infer<TSchema>> & BoundFields => {
	const { options, schema } = props;

	const form = useRhfForm<z.infer<TSchema>>({
		...options,
		mode: "all",
		resolver: zodResolver(schema) as Resolver<z.infer<TSchema>>,
		shouldUnregister: false,
	});

	const fieldsRef = useRef<BoundFields | undefined>(undefined);
	if (!fieldsRef.current) {
		const globalFields = fieldRegistry.getAll();

		fieldsRef.current = Object.freeze(globalFields) as BoundFields;
	}

	return Object.assign(form, fieldsRef.current);
};
