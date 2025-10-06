import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <nav 
      className="flex items-center justify-center gap-2 animate-fade-in"
      role="navigation"
      aria-label="Pagination"
    >
      <Button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        variant="outline"
        size="icon"
        className="h-10 w-10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-foreground"
        aria-label="Go to previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <div className="flex gap-2" role="list">
        {getPageNumbers().map((page, index) => (
          <div key={`${page}-${index}`} role="listitem">
            {page === "..." ? (
              <span className="flex items-center justify-center min-w-[40px] h-10 text-muted-foreground">
                ...
              </span>
            ) : (
              <Button
                onClick={() => onPageChange(page as number)}
                variant={currentPage === page ? "default" : "outline"}
                className={`min-w-[40px] h-10 transition-all ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground border-primary font-semibold shadow-lg shadow-primary/30"
                    : "hover:bg-primary/10 hover:border-primary hover:text-primary"
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        variant="outline"
        size="icon"
        className="h-10 w-10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-foreground"
        aria-label="Go to next page"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </nav>
  );
};
