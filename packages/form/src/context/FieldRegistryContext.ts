import { createContext, useContext } from "react";
import { type FieldRegistry } from "@/types";

interface FieldRegistryContextValue {
	fields: FieldRegistry;
}

const FieldRegistryContext = createContext<FieldRegistryContextValue | null>(
	null,
);

export const useFieldRegistry = () => {
	return useContext(FieldRegistryContext);
};
