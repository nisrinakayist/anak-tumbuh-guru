"use client";

type TablePaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const MAX_VISIBLE_PAGES = 3;

const buildPageNumbers = (page: number, totalPages: number) => {
  const visible = Math.min(MAX_VISIBLE_PAGES, totalPages);
  const start = Math.min(Math.max(1, page - 1), totalPages - visible + 1);
  return Array.from({ length: visible }, (_, index) => start + index);
};

const baseButton =
  "rounded-lg border px-3 py-1.5 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-40";

export default function TablePagination({ page, totalPages, onPageChange }: TablePaginationProps) {
  return (
    <nav aria-label="Pagination" className="flex items-center gap-1.5">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={`${baseButton} border-primary-100 text-primary-900/60 hover:bg-primary-50`}
      >
        Sebelumnya
      </button>

      {buildPageNumbers(page, totalPages).map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          aria-current={pageNumber === page ? "page" : undefined}
          onClick={() => onPageChange(pageNumber)}
          className={`${baseButton} ${
            pageNumber === page
              ? "border-primary-500 bg-primary-500 text-white"
              : "border-primary-100 text-primary-900 hover:bg-primary-50"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`${baseButton} border-primary-100 text-primary-900 hover:bg-primary-50`}
      >
        Berikutnya
      </button>
    </nav>
  );
}
