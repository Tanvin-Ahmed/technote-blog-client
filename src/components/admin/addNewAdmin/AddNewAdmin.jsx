import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const AddNewAdmin = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="w-100 h-100">
      <div className="w-100 d-flex justify-conetent-center align-items-center flex-column p-3 rounded border-shadow">
        <h3>Add new Admin</h3>
        <Form className="w-100" onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              type="email"
              placeholder="Admin Email..."
              className="px-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="btn-info">
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          </InputGroup>
        </Form>
      </div>
    </section>
  );
};

export default AddNewAdmin;
