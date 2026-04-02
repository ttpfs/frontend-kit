import { useFieldRegistry } from "@/context";
import { fieldRegistry } from "@/registry";
import { type FieldKey, type FieldTypeMap } from "@/types";

export const useField = <K extends FieldKey>(name: K): FieldTypeMap[K] => {
	const ctx = useFieldRegistry();

	const field =
		(ctx?.fields?.[name] as FieldTypeMap[K]) ?? fieldRegistry.get(name);

	return field;
};
