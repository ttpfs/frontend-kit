export type IconVariant = "outline" | "solid" | "color" | "bold";

export type IconDefinition = Partial<Record<IconVariant, string>>;

export type IconRegistry = Record<string, IconDefinition>;

export type IconSize = "sm" | "md" | "lg" | "xl" | "xs" | "2xl";
