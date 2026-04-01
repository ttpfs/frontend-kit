export const getPageNumbers = (page: number, totalPages: number) => {
	const pages: (number | "ellipsis")[] = [];
	pages.push(1);
	if (page > 3) {
		pages.push("ellipsis");
	}
	const start = Math.max(2, page - 1);
	const end = Math.min(totalPages - 1, page + 1);
	for (let i = start; i <= end; i++) {
		pages.push(i);
	}
	if (page < totalPages - 2) {
		pages.push("ellipsis");
	}
	pages.push(totalPages);
	return pages;
};
