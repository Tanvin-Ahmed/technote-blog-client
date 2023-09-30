import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState, useTransition } from "react";
import { Button, Card, Form, InputGroup, Table } from "react-bootstrap";
import { getTotalBlogCountByCategory } from "../../../apis/blog";
import {
  deleteCategory,
  getCategories,
  getCategoriesBySearch,
  getCategoryCount,
  updateCategory,
} from "../../../apis/categories";
import { pageCounter } from "../../../utils/pageCounter";
import { blogContext } from "../../context/BlogContext";
import CustomAlert from "../../shared/customAlert/CustomAlert";
import Loader from "../../shared/loader/Loader";
import Paginate from "../../shared/paginate/Paginate";

const DeleteOrUpdateCategory = () => {
  const {
    categories,
    setCategories,
    categoryCurrentPage,
    setCategoryCurrentPage,
    totalCategoryPage,
    setTotalCategoryPage,
    rowsPerPage,
    categoryPageTracker,
  } = useContext(blogContext);
  const [isPending, startTransition] = useTransition();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [foundCategories, setFoundCategories] = useState([]);

  const [apiStatus, setApiStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoryPageTracker.current < categoryCurrentPage) {
      getCategories(rowsPerPage, categoryCurrentPage * rowsPerPage).then(
        (data) => {
          if (data.categories.length) {
            setCategories((prev) => [...prev, ...data.categories]);
          }
        }
      );
      categoryPageTracker.current++;
    }
  }, [rowsPerPage, setCategories, categoryCurrentPage, categoryPageTracker]);

  const handleSelectCategory = (info) => {
    setSelectedCategory(info);
  };

  const handleUpdateName = (e) => {
    setSelectedCategory((prev) => ({ ...prev, category_name: e.target.value }));
  };

  const handleSearch = (e) => {
    setCategoryName(e.target.value);

    startTransition(() => {
      getCategoriesBySearch(e.target.value).then((data) => {
        if (data.categories.length) {
          setFoundCategories(data.categories);
        } else {
          setFoundCategories([]);
        }
      });
    });
  };

  const handleDelete = async (id) => {
    setLoading(true);

    const { count, errorMessage: error } = await getTotalBlogCountByCategory(
      id
    );

    if (error) {
      setLoading(false);
      return alert(error);
    } else {
      if (count > 0) {
        setLoading(false);
        setApiStatus({
          message: `There are ${count} blogs already in the category! You should update the category name rather than delete.`,
          status: "info",
        });
        return;
      }
    }

    const { message, errorMessage } = await deleteCategory(id);
    if (message) {
      setApiStatus({ message, status: "success" });
      setCategories((prev) => prev.filter((c) => c.id !== id));

      if (selectedCategory.id === id) {
        setSelectedCategory(null);
      }

      const { count } = await getCategoryCount();
      setTotalCategoryPage(pageCounter(count / rowsPerPage));
    } else {
      setApiStatus({ message: errorMessage, status: "danger" });
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    setLoading(true);
    const { category, errorMessage } = await updateCategory(selectedCategory);
    if (category) {
      setApiStatus({
        message: "Category update successfully!",
        status: "success",
      });
      setCategories((prev) => {
        const index = prev.findIndex((c) => c.id === selectedCategory.id);
        prev[index] = category;
        return prev;
      });
      setSelectedCategory(null);
    } else {
      setApiStatus({ message: errorMessage, status: "danger" });
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      handleUpdate();
    } else {
      // search category
    }
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column p-3 rounded border-shadow">
      <h3>Update or Delete Category</h3>

      <Form className="w-100" onSubmit={handleSubmit}>
        <InputGroup className="w-100">
          <Form.Control
            type="text"
            className="px-3"
            placeholder={
              selectedCategory ? "Rename selected Category" : "Search category"
            }
            onChange={selectedCategory ? handleUpdateName : handleSearch}
            value={
              selectedCategory ? selectedCategory.category_name : categoryName
            }
          />
          {selectedCategory ? (
            <Button type="submit" className="btn-outline-warning">
              Update
            </Button>
          ) : null}
        </InputGroup>
      </Form>

      {!loading && selectedCategory && (
        <Button
          className="mt-2 btn-outline-danger"
          onClick={() => setSelectedCategory(null)}
        >
          Close update
        </Button>
      )}
      {loading ? (
        <div className="mt-2 text-center">
          <Loader />
        </div>
      ) : apiStatus ? (
        <div className="mt-2">
          <CustomAlert
            message={apiStatus.message}
            variant={apiStatus.status}
            setState={setApiStatus}
          />
        </div>
      ) : null}

      <Card className="p-3 w-100 mt-3">
        <p>Total categories: {categories.length || 0}</p>
        <Table striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>Category</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {(categoryName
              ? foundCategories.length > 0
                ? foundCategories
                : []
              : categories
            )
              .slice(
                categoryCurrentPage * rowsPerPage,
                categoryCurrentPage * rowsPerPage + rowsPerPage
              )
              .map((category, i) => (
                <tr key={category?.id} className="text-center">
                  <td>{category?.category_name}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <Button
                        className="btn-outline-info"
                        size="sm"
                        onClick={() => handleSelectCategory(category)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button
                        className="btn-outline-danger"
                        size="sm"
                        onClick={() => handleDelete(category?.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {!foundCategories.length && !categoryName && (
          <div className="mt-3">
            <Paginate
              pages={totalCategoryPage}
              page={categoryCurrentPage + 1}
              setPage={setCategoryCurrentPage}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default DeleteOrUpdateCategory;
