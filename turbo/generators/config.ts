import { type PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
	plop.setGenerator("package", {
		actions: [
			{
				path: "packages/{{libName}}/package.json",
				templateFile: "templates/package.json.hbs",
				type: "add",
			},
			{
				path: "packages/{{libName}}/tsconfig.json",
				templateFile: "templates/tsconfig.json.hbs",
				type: "add",
			},
			{
				path: "packages/{{libName}}/tsup.config.ts",
				templateFile: "templates/tsup.config.ts.hbs",
				type: "add",
			},
			{
				path: "packages/{{libName}}/src/index.ts",
				template: "export * from '' ",
				type: "add",
			},
		],
		description: "Create a new package",
		prompts: [
			{
				message: "Library name:",
				name: "libName",
				type: "input",
				validate: (input: string) => {
					if (input.includes(".")) {
						return "Library name cannot include dot";
					}
					if (input.includes(" ")) {
						return "Library name cannot include spaces";
					}
					if (!input) {
						return "Library name is required";
					}
					return true;
				},
			},
			{
				message: "Package name:",
				name: "packageName",
				type: "input",
				validate: (input: string) => {
					if (input.includes(".")) {
						return "Package name cannot include dot";
					}
					if (input.includes(" ")) {
						return "Package name cannot include spaces";
					}
					if (!input) {
						return "Package name is required";
					}
					return true;
				},
			},
		],
	});
}
