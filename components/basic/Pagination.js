import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageClick }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <li
        key={i}
        className={`${
          i === currentPage
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-blue-200 text-gray-700'
        } px-3 py-2 rounded-md mr-1`}
      >
        <button onClick={() => handlePageClick(i)}>{i}</button>
      </li>
    );
  }

  return (
    <div className="flex justify-center items-center mt-4">
      <ul className="flex">
        {!isFirstPage && (
          <li className="bg-gray-200 hover:bg-blue-200 text-gray-700 px-3 py-2 rounded-l-md mr-1">
            <button onClick={() => handlePageClick(prevPage)}>Prev</button>
          </li>
        )}

        {pages}

        {!isLastPage && (
          <li className="bg-gray-200 hover:bg-blue-200 text-gray-700 px-3 py-2 rounded-r-md ml-1">
            <button onClick={() => handlePageClick(nextPage)}>Next</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
