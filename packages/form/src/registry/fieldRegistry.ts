import { type FieldKey, type FieldTypeMap } from "@/types";

class GlobalFieldRegistry {
	private fields: Partial<FieldTypeMap> = {};

	register<K extends FieldKey>(
		name: K,
		comp: FieldTypeMap[K],
		override = false,
	) {
		if (!override && this.fields[name]) {
			throw new Error(`Field "${String(name)}" already registered`);
		}
		this.fields[name] = comp;
	}

	get<K extends FieldKey>(name: K): FieldTypeMap[K] {
		const field = this.fields[name];
		if (!field) {
			throw new Error(`Field "${String(name)}" not found`);
		}
		return field as FieldTypeMap[K];
	}

	registerMany<K extends FieldKey>(
		fields: Partial<Pick<FieldTypeMap, K>>,
		override = false,
	) {
		(Object.keys(fields) as K[]).forEach((key) => {
			const comp = fields[key];
			if (!comp) return;

			this.register(key, comp, override);
		});
	}

	getAll(): Partial<FieldTypeMap> {
		return this.fields;
	}
}

export const fieldRegistry = new GlobalFieldRegistry();
