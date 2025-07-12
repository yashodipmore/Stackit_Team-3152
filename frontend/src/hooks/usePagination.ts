import { useState, useEffect } from 'react';

interface PaginationOptions {
  initialPage?: number;
  itemsPerPage?: number;
}

interface PaginationResult<T> {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
  loading: boolean;
  error: string | null;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  refetch: () => void;
}

export const usePagination = <T>(
  fetchFunction: (page: number, limit: number) => Promise<{ data: T[]; total: number }>,
  options: PaginationOptions = {}
): PaginationResult<T> => {
  const { initialPage = 1, itemsPerPage = 10 } = options;
  
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [items, setItems] = useState<T[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const fetchData = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFunction(page, itemsPerPage);
      setItems(result.data);
      setTotalItems(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const refetch = () => {
    fetchData(currentPage);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return {
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    items,
    loading,
    error,
    goToPage,
    goToNextPage,
    goToPrevPage,
    refetch,
  };
};
