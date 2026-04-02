export type InputType =
	| "text"
	| "search"
	| "url"
	| "tel"
	| "email"
	| "password"
	| (string & {});

export type Granularity = "day" | "hour" | "minute" | "second";

// biome-ignore lint/suspicious/noExplicitAny: <>
export type DataType = Record<string, any>;
