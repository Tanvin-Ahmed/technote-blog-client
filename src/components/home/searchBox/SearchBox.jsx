import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState, useTransition } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { getCategoriesBySearch } from "../../../apis/categories";
import { blogContext } from "../../context/BlogContext";
import CustomAlert from "../../shared/customAlert/CustomAlert";
import Loader from "../../shared/loader/Loader";
import "./searchBox.scss";

const SearchBox = ({ searchBlogs }) => {
  const { searchTerm, setSearchTerm, searchArea, setSearchArea } =
    useContext(blogContext);
  const [isPending, startTransition] = useTransition();
  const [similiarCategory, setSimilarCategory] = useState([]);
  const [error, setError] = useState(null);

  const selectCategory = (category) => {
    setSearchTerm(category);
    setSimilarCategory([]);
    setError(null);
  };

  const handleChangeArea = (e) => {
    setSearchArea(e.target.value);
    setSearchTerm(null);
    setSimilarCategory([]);
    setError(null);
  };

  const handleChange = (e) => {
    if (searchArea === "category") {
      if (
        similiarCategory.length &&
        similiarCategory[0]?.category_name.toLowerCase() ===
          e.target.value.toLowerCase()
      ) {
        setSearchTerm(similiarCategory[0]);
      } else {
        setSearchTerm({ category_name: e.target.value, id: -1 });
      }
      startTransition(() => {
        getCategoriesBySearch(e.target.value).then((data) => {
          if (data.errorMessage) {
            setError({ message: data.errorMessage, status: "info" });
          }
          if (data.categories.length) {
            setSimilarCategory(data.categories);
          } else {
            setSimilarCategory([]);
            setError({ message: "Categories not found", status: "info" });
          }
        });
      });
    } else {
      setSearchTerm(e.target.value);
    }
  };

  return (
    <div className="position-relative search-box">
      <Form>
        <div className="d-flex justify-content-center align-items-center gap-4">
          <Form.Check
            type="radio"
            value={"general"}
            label={"General"}
            checked={searchArea === "general"}
            onChange={handleChangeArea}
          />
          <Form.Check
            type="radio"
            value={"category"}
            label={"Category"}
            checked={searchArea === "category"}
            onChange={handleChangeArea}
          />
        </div>
        <InputGroup>
          <Form.Control
            type="text"
            value={
              searchArea === "category"
                ? searchTerm?.category_name || ""
                : searchTerm || ""
            }
            onChange={handleChange}
            placeholder={
              searchArea === "category"
                ? "Search Category..."
                : "Search blog..."
            }
            className="px-3"
          />
          <Button className="btn-outline-primary" onClick={searchBlogs}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </InputGroup>
      </Form>
      {isPending ? (
        <div
          className="position-fixed py-2 px-3 w-75 bg-light rounded border-shadow"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            overflowX: "hidden",
            zIndex: "300",
          }}
        >
          <Loader />
        </div>
      ) : !!similiarCategory.length ? (
        <div
          className="position-fixed py-2 px-3 w-75 bg-light rounded border-shadow"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            overflowX: "hidden",
            zIndex: "300",
          }}
        >
          <ul>
            {similiarCategory.map((category) => (
              <li
                className="py-2 list-hover"
                onClick={() => selectCategory(category)}
                key={category.id}
              >
                {category.category_name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        error && (
          <div
            className="position-fixed py-2 px-3 w-75 bg-light rounded border-shadow"
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              overflowX: "hidden",
              zIndex: "300",
            }}
          >
            <CustomAlert
              message={error.message}
              variant={error.status}
              setState={setError}
            />
          </div>
        )
      )}
    </div>
  );
};

export default SearchBox;
