import { getPageNumbers } from "@/utils";
import { Pagination as BasePagination } from "@heroui/react";
import type React from "react";
import { useMemo, useState } from "react";

const PaginationRoot = BasePagination;

type PaginationProps = {
	page?: number;
	onPageChange?: (page: number) => void;
	totalPages?: number;
	showEllipsis?: boolean;
	summary?: string | React.ReactNode;
};

const PaginationImpl: React.FC<PaginationProps> = (props) => {
	const {
		onPageChange,
		page,
		showEllipsis = true,
		summary,
		totalPages = 3,
	} = props;

	const [_page, setPage] = useState<number>(page || 1);

	const onChange = (page: number) => {
		setPage(page);
		onPageChange?.(page);
	};

	const onPrev = (page: number) => {
		if (_page <= 1) return;

		setPage((p) => p - 1);
		onPageChange?.(page - 1);
	};

	const onNext = (page: number) => {
		if (_page >= totalPages) return;

		setPage((p) => p + 1);
		onPageChange?.(page + 1);
	};

	const pageNumbers = useMemo(
		() =>
			showEllipsis
				? getPageNumbers(_page, totalPages)
				: Array.from({ length: totalPages }, (_, i) => i + 1),
		[showEllipsis, _page, totalPages],
	);

	return (
		<PaginationRoot>
			<PaginationRoot.Summary>{summary}</PaginationRoot.Summary>
			<PaginationRoot.Content>
				<PaginationRoot.Item>
					<PaginationRoot.Previous
						isDisabled={_page === 1}
						onPress={() => onPrev(_page)}
					>
						<PaginationRoot.PreviousIcon />
						<span>Previous</span>
					</PaginationRoot.Previous>
				</PaginationRoot.Item>
				{pageNumbers.map((p) =>
					p === "ellipsis" ? (
						<PaginationRoot.Item key={`ellipsis-${p}`}>
							<PaginationRoot.Ellipsis />
						</PaginationRoot.Item>
					) : (
						<PaginationRoot.Item key={p}>
							<PaginationRoot.Link
								isActive={p === _page}
								onPress={() => onChange(p)}
							>
								{p}
							</PaginationRoot.Link>
						</PaginationRoot.Item>
					),
				)}
				<PaginationRoot.Item>
					<PaginationRoot.Next
						isDisabled={_page === totalPages}
						onPress={() => onNext(_page)}
					>
						<span>Next</span>
						<PaginationRoot.NextIcon />
					</PaginationRoot.Next>
				</PaginationRoot.Item>
			</PaginationRoot.Content>
		</PaginationRoot>
	);
};

const Pagination = Object.assign(PaginationImpl, {
	displayName: "Pagination",
});

export { Pagination };
