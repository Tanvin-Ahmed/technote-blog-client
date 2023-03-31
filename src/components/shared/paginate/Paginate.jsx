import React from "react";
import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Paginate = ({ pages, page, route, setPage }) => {
  const navigate = useNavigate();
  const handleClickFirst = () => {
    // set page = 1
    setPage(0);
    if (route) navigate(`${route}/0`);
  };

  const handleClickPrevious = () => {
    // decrease page number by 1 in every click
    setPage((prev) => {
      if (route) navigate(`${route}/${prev - 1}`);
      return prev - 1;
    });
  };

  const handleClickNext = () => {
    // increase page by one in every click
    setPage((prev) => {
      if (route) navigate(`${route}/${prev + 1}`);
      return prev + 1;
    });
  };

  const handleClickLast = () => {
    // set page = pages
    setPage(pages - 1);
    if (route) navigate(`${route}/${pages - 1}`);
  };

  return pages > 1 ? (
    <Pagination className="d-flex justify-content-center align-items-center">
      {page > 1 && (
        <>
          <Pagination.First onClick={handleClickFirst} />
          <Pagination.Prev onClick={handleClickPrevious} />
        </>
      )}
      <strong>
        {page} of {pages}
      </strong>
      {page < pages && (
        <>
          <Pagination.Next onClick={handleClickNext} />
          <Pagination.Last onClick={handleClickLast} />
        </>
      )}
    </Pagination>
  ) : null;
};

export default Paginate;
