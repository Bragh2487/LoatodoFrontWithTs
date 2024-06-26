import React, { useEffect } from "react";
import "../styles/components/PageNation.css";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  totalPages: number;
}

const PageNation: React.FC<Props> = ({ totalPages }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page") || "1", 10);

  useEffect(() => {
    generatePageNumbers();
  }, [page]);

  const handlePageClick = (page: number) => {
    queryParams.set("page", page.toString());
    navigate({ search: queryParams.toString() });
  };

  const generatePageNumbers = () => {
    const pageNumbers: JSX.Element[] = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`pagination__number ${
              page === i ? "pagination__number--active" : ""
            }`}
            onClick={() => handlePageClick(i)}
            role="link"
          >
            {i}
          </button>
        );
      }
    } else {
      if (page < 6) {
        for (let i = 1; i <= 10; i++) {
          pageNumbers.push(
            <button
              key={i}
              className={`pagination__number ${
                page === i ? "pagination__number--active" : ""
              }`}
              onClick={() => handlePageClick(i)}
              role="link"
            >
              {i}
            </button>
          );
        }
      } else {
        let lastPage = page + 4;
        if (lastPage > totalPages) {
          lastPage = totalPages;
        }
        for (let i = page - 5; i <= lastPage; i++) {
          pageNumbers.push(
            <button
              key={i}
              className={`pagination__number ${
                page === i ? "pagination__number--active" : ""
              }`}
              onClick={() => handlePageClick(i)}
              role="link"
            >
              {i}
            </button>
          );
        }
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination" aria-label="페이지네이션">
      <button className="pagination__first" onClick={() => handlePageClick(1)}>
        처음
      </button>
      <button
        className="pagination__prev"
        onClick={() => handlePageClick(page - 1)}
        disabled={page === 1}
      >
        이전
      </button>
      {generatePageNumbers()}
      <button
        className="pagination__next"
        onClick={() => handlePageClick(page + 1)}
        disabled={page === totalPages}
      >
        다음
      </button>
      <button
        className="pagination__last"
        onClick={() => handlePageClick(totalPages)}
      >
        마지막
      </button>
    </div>
  );
};

export default PageNation;
