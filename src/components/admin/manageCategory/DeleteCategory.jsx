import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Button, Card, Form, InputGroup, Table } from "react-bootstrap";
import { deleteCategory, updateCategory } from "../../../apis/categories";
import { blogContext } from "../../context/BlogContext";
import CustomAlert from "../../shared/customAlert/CustomAlert";
import Loader from "../../shared/loader/Loader";

const DeleteCategory = () => {
  const { categories, setCategories } = useContext(blogContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const [apiStatus, setApiStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectCategory = (info) => {
    setSelectedCategory(info);
  };

  const handleUpdateName = (e) => {
    setSelectedCategory((prev) => ({ ...prev, category_name: e.target.value }));
  };

  const handleSearch = (e) => {
    setCategoryName(e.target.value);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const { message, errorMessage } = await deleteCategory(id);
    if (message) {
      setApiStatus({ message, status: "success" });
      setCategories((prev) => prev.filter((c) => c.id !== id));

      if (selectedCategory.id === id) {
        setSelectedCategory(null);
      }
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
    <div className="w-100 d-flex justify-conetent-center align-items-center flex-column p-3 rounded border-shadow">
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
          ) : (
            <Button type="submit" className="btn-outline-primary">
              Search
            </Button>
          )}
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
        <Table striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>Id</th>
              <th>Category</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {!!categories.length &&
              categories.map((category) => (
                <tr key={category?.id} className="text-center">
                  <td>{category?.id}</td>
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
      </Card>
    </div>
  );
};

export default DeleteCategory;
