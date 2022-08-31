const usePagination = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  pageSize = pageSize || 5;

  return {
    page,
    pageSize,
    totalItems,

    totalPages,

    startIndex: pageSize * (page - 1),
    endIndex: pageSize * (page - 1) + pageSize,

    nextPage: page + 1,
    previousPage: page - 1,

    previousEnabled: page > 1,
    nextEnabled: page < totalPages,
  };
};

export default usePagination;
