import fs from "node:fs";
import path from "node:path";

const PACKAGES_DIR = "./packages";
const README_PATH = "./README.md";

const packageDirs = fs.readdirSync(PACKAGES_DIR);

const descriptions: Record<string, string> = {
	"@ttpfs/form-react":
		"Type-safe React form library built with react-hook-form, Zod, and HeroUI.",
	"@ttpfs/table-react":
		"Flexible React table built on TanStack Table with a polished HeroUI layer.",
	"@ttpfs/ui-react":
		"React UI component library built on HeroUI (using Tailwind CSS v4) with simplified APIs and theming support.",
};

const rows = packageDirs
	.map((dir) => {
		const pkgPath = path.join(PACKAGES_DIR, dir, "package.json");
		const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

		return { dir, pkg };
	})
	.filter(({ pkg }) => !pkg.private)
	.map(({ dir, pkg }) => {
		const name = pkg.name;
		const version = pkg.version;
		const desc = descriptions[name] || "";

		return `| [\`${name}\`](./packages/${dir}) | \`${version}\` | ${desc} |`;
	});

const table = `
| Package | Version | Description |
|---|---|---|
${rows.join("\n")}
`;

let readme = fs.readFileSync(README_PATH, "utf-8");

readme = readme.replace(
	/<!-- PACKAGES_TABLE_START -->([\s\S]*?)<!-- PACKAGES_TABLE_END -->/,
	`<!-- PACKAGES_TABLE_START -->\n${table}\n<!-- PACKAGES_TABLE_END -->`,
);

fs.writeFileSync(README_PATH, readme);
