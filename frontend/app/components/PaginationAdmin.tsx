import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const PaginationAdmin = ({
  currentPage,
  totalPages,
  onPageChange,
}: TablePaginationProps) => {
  const renderPageNumber = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem className=" " key={i}>
          <PaginationLink
            isActive={currentPage === i}
            className={`text-white border-0 hover:bg-gray-700 hover:text-white ${
              currentPage === i ? "bg-gray-700" : "bg-none"
            }`}
            // href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-default hover:bg-gray-700 hover:text-white"
            // href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        {renderPageNumber()}

        {totalPages > 3 && currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className="cursor-default hover:bg-gray-700 hover:text-white"
            // href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationAdmin;
