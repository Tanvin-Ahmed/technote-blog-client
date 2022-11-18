import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = "",
  route,
  setPage,
}) => {
  const handleClicFirst = () => {
    // set page = 1
    setPage(1);
  };

  const handleClickPrevious = () => {
    // decrease page number by 1 in every click
    setPage((prev) => --prev);
  };

  const handleClickNext = () => {
    // increase page by one in every click
    setPage((prev) => ++prev);
  };

  const handleClickLast = () => {
    // set page = pages
    setPage(pages);
  };

  return pages > 1 ? (
    <Pagination>
      {page > 1 ? (
        <>
          <Pagination.First onClick={handleClicFirst} />
          <Pagination.Prev onClick={handleClickPrevious} />
        </>
      ) : null}

      {[...Array(pages).keys()].slice(page - 1, page + 1).map((x) => (
        <LinkContainer
          style={{ zIndex: 0 }}
          key={x + 1}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
              : `${route}/${x + 1}`
          }
        >
          <Pagination.Item
            active={x + 1 === page}
            onClick={() => setPage(x + 1)}
          >
            {x + 1}
          </Pagination.Item>
        </LinkContainer>
      ))}
      {page <= pages - 2 ? (
        <>
          <Pagination.Next onClick={handleClickNext} />
          <Pagination.Last onClick={handleClickLast} />
        </>
      ) : null}
    </Pagination>
  ) : null;
};

export default Paginate;
