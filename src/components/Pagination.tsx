interface PaginationProps {
  currPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

export const Pagination = ({
  currPage,
  onPageChange,
  totalPages,
}: PaginationProps) => {
  return (
    <div className="flex justify-center gap-3 items-center">
      <PaginatedButton
        disabled={currPage === 1}
        onClick={() => onPageChange(currPage - 1)}
        label="Prev"
      />
      <p>
        {currPage} of {totalPages}
      </p>
      <PaginatedButton
        disabled={currPage === totalPages}
        onClick={() => onPageChange(currPage + 1)}
        label="Next"
      />
    </div>
  );
};

const PaginatedButton = ({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`border border-ui-border-primary px-3 py-1 rounded-md ${
        !disabled
          ? "cursor-pointer  hover:bg-ui-button-primary hover:text-ui-button-text-primary"
          : ""
      }`}
    >
      {label}
    </button>
  );
};
