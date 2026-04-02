import { Pagination as BasePagination, cn } from "@heroui/react";
import type React from "react";
import { useMemo } from "react";
import { getPageNumbers } from "@/utils";

const PaginationRoot = BasePagination;

type PaginationProps = {
	page?: number;
	onPageChange?: (page: number) => void;
	totalPages?: number;
	showEllipsis?: boolean;
	summary?: string | React.ReactNode;
	className?: {
		item?: string;
		summary?: string;
		prev?: string;
		next?: string;
	};
};

const PaginationImpl: React.FC<PaginationProps> = (props) => {
	const {
		onPageChange,
		page,
		showEllipsis = true,
		summary,
		totalPages = 0,
		className,
	} = props;

	const _page = page ?? 1;

	const onChange = (page: number) => {
		onPageChange?.(page);
	};

	const onPrev = (page: number) => {
		if (_page <= 1) return;

		onPageChange?.(page - 1);
	};

	const onNext = (page: number) => {
		if (_page >= totalPages) return;

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
			<PaginationRoot.Summary className={cn(className?.summary)}>
				{summary}
			</PaginationRoot.Summary>
			<PaginationRoot.Content>
				<PaginationRoot.Item>
					<PaginationRoot.Previous
						className={className?.prev}
						isDisabled={_page === 1}
						onPress={() => onPrev(_page)}
					>
						<PaginationRoot.PreviousIcon />
						<span className="hidden sm:block">Sau</span>
					</PaginationRoot.Previous>
				</PaginationRoot.Item>
				{pageNumbers.map((p, i) =>
					p === "ellipsis" ? (
						<PaginationRoot.Item
							className={className?.item}
							key={`ellipsis-${p}-${i}`}
						>
							<PaginationRoot.Ellipsis />
						</PaginationRoot.Item>
					) : (
						<PaginationRoot.Item className={className?.item} key={p}>
							<PaginationRoot.Link
								isActive={p === _page}
								isDisabled={p === _page}
								onPress={() => onChange(p)}
							>
								{p}
							</PaginationRoot.Link>
						</PaginationRoot.Item>
					),
				)}
				<PaginationRoot.Item>
					<PaginationRoot.Next
						className={className?.next}
						isDisabled={_page === totalPages}
						onPress={() => onNext(_page)}
					>
						<span className="hidden sm:block">Trước</span>
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
