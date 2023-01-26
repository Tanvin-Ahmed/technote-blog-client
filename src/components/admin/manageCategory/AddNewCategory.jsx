import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState, useTransition } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import {
  createNewCategory,
  getCategoriesBySearch,
} from "../../../apis/categories";
import { blogContext } from "../../context/BlogContext";
import CustomAlert from "../../shared/customAlert/CustomAlert";
import DeleteOrUpdateCategory from "./DeleteOrUpdateCategory";

const AddNewCategory = () => {
  const { setCategories } = useContext(blogContext);
  const [category, setCategory] = useState("");
  const [isPending, startTransition] = useTransition();
  const [apiStatus, setApiStatus] = useState(null);
  const [foundCategories, setFoundCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setCategory(e.target.value);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (foundCategories.length) {
      return alert("This category already exists!");
    }

    setLoading(true);
    createNewCategory(category).then((data) => {
      if (data.category) {
        setCategories((prev) => [...prev, data.category]);
        setApiStatus({
          message: "Create category successfully!",
          status: "success",
        });
        setCategory("");
      } else {
        setApiStatus({ message: data.errorMessage, status: "danger" });
      }
      setLoading(false);
    });
  };

  return (
    <section className="w-100 h-100">
      <div className="w-100 d-flex justify-conetent-center align-items-center flex-column p-3 rounded border-shadow">
        <h3>Add new Category</h3>
        <Form className="w-100" onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Write category name"
              className="px-2"
              value={category}
              onChange={handleOnChange}
              required
            />
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
              <>
                {foundCategories.length > 0 ? (
                  <Button type="submit" className="btn-outline-danger">
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                ) : (
                  <Button type="submit" className="btn-outline-primary">
                    <FontAwesomeIcon icon={faCheck} />
                  </Button>
                )}
              </>
            )}
          </InputGroup>
        </Form>
        <div className="mt-4">
          {apiStatus ? (
            <CustomAlert
              message={apiStatus?.message}
              variant={apiStatus.status}
              setState={setApiStatus}
            />
          ) : null}
        </div>
      </div>
      <div className="mt-5">
        <DeleteOrUpdateCategory />
      </div>
    </section>
  );
};

export default AddNewCategory;
