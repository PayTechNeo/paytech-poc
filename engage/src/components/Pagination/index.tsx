import React, { useEffect, useState } from 'react'
import { Button, BUTTON_VARIANTS } from '../button';
import { Label } from '../label';

interface PaginationProps {
  totalCount?: number;
  page?: number;
  onPageChangeCb: (page: number) => void;
  limit?: number;
}

const Pagination: React.FC<PaginationProps> = ({ 
  totalCount = 10, 
  page = 1, 
  onPageChangeCb, 
  limit = 10 
}) => {
    const [currentPage, setCurrentPage] = useState(page)
    const totalPages = Math.ceil(totalCount / limit);

    useEffect(() => {
        onPageChangeCb(currentPage)
    }, [currentPage, onPageChangeCb])

    const renderPages = () => {
        const maxPagesToShow = window.innerWidth < 640 ? 3 : 5; // Show fewer pages on mobile
        const maxPages = Math.min(totalPages, maxPagesToShow);
        const pages = [];

        let startPage = 1;
        let endPage = maxPages;

        if (currentPage > Math.floor(maxPagesToShow / 2)) {
            startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
            endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={"pagination-page" + i}>
                    <Button
                        onClickCb={() => setCurrentPage(i)}
                        variant={i === currentPage ? BUTTON_VARIANTS.CONTAINED : BUTTON_VARIANTS.OUTLINED_GRAY}
                        className="fs-14 flex items-center justify-center px-2 sm:px-3 h-8 sm:h-9 text-xs sm:text-sm"
                    >
                        {i}
                    </Button>
                </li>
            );
        }

        return pages;
    };

    return (
        <div className='my-2 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0'>
            <div className="text-xs sm:text-sm">
                <Label color="gray-500" fontSize="sm" fontWeight='bold'>
                    showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, totalCount)} of {totalCount}
                </Label>
            </div>
            <nav className="w-full sm:w-auto">
                <ul className="flex text-sm justify-center sm:justify-between gap-1 sm:gap-[10px]">
                    <li>
                        <Button 
                          onClickCb={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
                          variant={BUTTON_VARIANTS.OUTLINED_GRAY} 
                          className={`fs-14 flex items-center justify-center px-2 sm:px-3 h-8 sm:h-9 bg-white border border-gray-300 rounded text-xs sm:text-sm ${currentPage === 1 ? "text-gray-500 cursor-not-allowed" : ""}`}
                          disabled={currentPage === 1}
                        >
                          <span className="hidden sm:inline">Previous</span>
                          <span className="sm:hidden">Prev</span>
                        </Button>
                    </li>
                    {renderPages()}
                    <li>
                        <Button 
                          onClickCb={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                          variant={BUTTON_VARIANTS.OUTLINED_GRAY} 
                          className={`fs-14 flex items-center justify-center px-2 sm:px-3 h-8 sm:h-9 bg-white border border-gray-300 rounded text-xs sm:text-sm ${currentPage === totalPages ? "text-gray-500 cursor-not-allowed" : ""}`}
                          disabled={currentPage === totalPages}
                        >
                          <span className="hidden sm:inline">Next</span>
                          <span className="sm:hidden">Next</span>
                        </Button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination; 