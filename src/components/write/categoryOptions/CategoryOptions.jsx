import React, { useContext, useState, useTransition } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { getCategories, getCategoriesBySearch } from "../../../apis/categories";
import { blogContext } from "../../context/BlogContext";
import CustomAlert from "../../shared/customAlert/CustomAlert";
import Loader from "../../shared/loader/Loader";
import "./categoryOptions.scss";

const CategoryOptions = ({ selectedCategory, setSelectedCategory }) => {
  const {
    categories,
    setCategories,
    totalCategoryPage,
    categoryCurrentPage,
    setCategoryCurrentPage,
    categoryPageTracker,
    rowsPerPage,
  } = useContext(blogContext);

  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [similiarCategory, setSimiliarCategory] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);

    if (!e.target.value.trim()) {
      setSimiliarCategory([]);
      return;
    }

    startTransition(() => {
      getCategoriesBySearch(e.target.value).then((data) => {
        setSimiliarCategory(data.categories);
        if (data.errorMessage) {
          setError({ message: data.errorMessage, status: "warning" });
        }
      });
    });
  };

  const handleSelectCategory = (id) => {
    setSelectedCategory(id);
  };

  const handleGetMoreCategory = async () => {
    setLoading(true);
    const { categories, errorMessage } = await getCategories(
      rowsPerPage,
      rowsPerPage * categoryCurrentPage
    );
    if (categories.length) {
      setCategories((prev) => [...prev, ...categories]);
      setCategoryCurrentPage((prev) => prev + 1);
      categoryPageTracker.current++;
    }
    if (errorMessage) setError({ message: errorMessage, status: "danger" });
    setLoading(false);
  };

  return (
    <div className="item border-shadow p-3 category-container">
      <h3>Category</h3>
      <Form.Control
        type="text"
        placeholder="Search Category"
        onChange={handleSearch}
        value={search}
      />
      <hr />
      <div className="categories">
        {(similiarCategory.length > 0 || search.trim()
          ? similiarCategory
          : categories
        ).map((category, index) => (
          <Form.Check
            key={index}
            type={"radio"}
            value={category.category_name}
            label={category.category_name}
            checked={selectedCategory === category.id}
            onChange={() => handleSelectCategory(category?.id)}
          />
        ))}
        {search.trim() && isPending && (
          <div className="text-center">
            <Loader />
          </div>
        )}
        {!search.trim() &&
          totalCategoryPage > 1 &&
          totalCategoryPage > categoryCurrentPage && (
            <div className="mt-4 mb-3 text-center">
              {loading ? (
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Loading...</span>
                </Button>
              ) : (
                <Button
                  className="btn-outline-primary"
                  size="sm"
                  onClick={handleGetMoreCategory}
                >
                  More...
                </Button>
              )}
            </div>
          )}
        {error && (
          <div className="my-3">
            <CustomAlert
              message={error.message}
              variant={error.status}
              setState={setError}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryOptions;
