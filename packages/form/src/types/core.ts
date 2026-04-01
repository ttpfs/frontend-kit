export type InputType =
	| "text"
	| "search"
	| "url"
	| "tel"
	| "email"
	| "password"
	| (string & {});

export type Granularity = "day" | "hour" | "minute" | "second";
