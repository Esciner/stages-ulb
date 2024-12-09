"use client";

import React, { useState, useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [inputValue, setInputValue] = useState(currentPage);

  // Synchroniser inputValue avec currentPage
  useEffect(() => {
    setInputValue(currentPage);
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0 && value <= totalPages) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    if (inputValue !== currentPage) {
      onPageChange(inputValue);
    }
  };

  return (
    <div className="flex items-center justify-center mt-6 space-x-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        ← Précédent
      </button>
      <div className="flex items-center space-x-2">
        <label
          htmlFor="pageInput"
          className="text-sm font-medium text-gray-700"
        >
          Page :
        </label>
        <input
          id="pageInput"
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          min={1}
          max={totalPages}
          className="w-16 p-2 border border-gray-300 rounded-md text-center shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        <span className="text-sm text-gray-700">/ {totalPages}</span>
      </div>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Suivant →
      </button>
    </div>
  );
};

export default Pagination;
