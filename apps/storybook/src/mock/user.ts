export type User = {
	id: string;
	name: string;
	email: string;
	role: string;
	status: "Active" | "Inactive" | "Pending";
};

const firstNames = [
	"Kate",
	"John",
	"Alice",
	"David",
	"Emma",
	"Liam",
	"Olivia",
	"Noah",
];
const lastNames = ["Moore", "Smith", "Johnson", "Brown", "Davis", "Miller"];
const roles = ["CEO", "CTO", "Manager", "Engineer", "Designer"];
const statuses: User["status"][] = ["Active", "Inactive", "Pending"];

function random<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

export function generateUsers(count: number): User[] {
	const usedEmails = new Set<string>();

	return Array.from({ length: count }, (_, i) => {
		let email = "";

		// đảm bảo email unique
		do {
			const first = random(firstNames).toLowerCase();
			const last = random(lastNames).toLowerCase();
			email = `${first}.${last}${Math.floor(Math.random() * 100)}@acme.com`;
		} while (usedEmails.has(email));

		usedEmails.add(email);

		const name = email
			?.split("@")?.[0]
			.split(".")
			.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
			.join(" ");

		return {
			email,
			id: `${i + 1}`,
			name,
			role: random(roles),
			status: random(statuses),
		};
	});
}
