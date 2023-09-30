import React, { useState, useEffect } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

interface Props {
     currentPage: number;
     totalPages: number;
     onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
     const [visiblePageNumber, setVisiblePageNumber] = useState<number[]>([]);
     // Calculate visible page numbers
     const calculatePageNumber = () => {
          const maxButton = 5;
          const halfButtons = Math.floor(maxButton / 2);
          const startPage = Math.max(currentPage - halfButtons, 1);
          const endPage = Math.min(startPage + maxButton - 1, totalPages);

          const pageNumbers: number[] = [];
          for (let i = startPage; i <= endPage; i++) {
               pageNumbers.push(i);
          }
          setVisiblePageNumber(pageNumbers);
     };
     useEffect(() => calculatePageNumber(), [currentPage, totalPages]);

     // Handle page Change
     const handlePageChange = (pageNumber: number) => {
          if (pageNumber !== currentPage) {
               onPageChange(pageNumber);
          }
     };

     // Render the page numbers
     const renderPageNumbers = () => {
          return visiblePageNumber.map(pageNumber => (
               <button
                    key={pageNumber}
                    className={`px-3 py-2 mx-1 rounded-lg cursor-pointer ${
                         pageNumber === currentPage ? "bg-orange-500 text-white" : "bg-gray-300 hover:bg-orange-500"
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
               >
                    {pageNumber}
               </button>
          ));
     };

     return (
          <div className="flex items-center justify-center">
               <button
                    disabled={currentPage <= 1}
                    className="p-3 mx-1 text-white bg-orange-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(currentPage - 1)}
               >
                    <BsFillArrowLeftCircleFill />
               </button>
               {currentPage > 3 && <span className="mx-1">...</span>}
               {renderPageNumbers()}
               {currentPage + 2 < totalPages && <span className="mx-1">...</span>}
               <button
                    disabled={currentPage >= totalPages}
                    className="p-3 mx-1 text-lg text-white bg-orange-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(currentPage + 1)}
               >
                    <BsFillArrowRightCircleFill />
               </button>
          </div>
     );
}
