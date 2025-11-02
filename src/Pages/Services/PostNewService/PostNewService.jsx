import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FloatingLabel,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

export default function PostNewServicePage() {
  // Initial form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    observations: "",
    address: "",
    preferredDate: "",
    budget: "",
    currency: "EGP",
    images: [],
  });

  // Validation State
  const [validationErrors, setValidationErrors] = useState({});

  // Handle changes (including file uploads)
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images" && files) {
      setFormData((prevData) => ({
        ...prevData,
        images: Array.from(files),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    // Clear validation error instantly when user types
    if (validationErrors[name]) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  // Form validation
  const validateForm = (data) => {
    const errors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // --- 1. Title ---
    if (!data.title || data.title.length < 5) {
      errors.title = "Title required with minimum 5 characters.";
    }

    // --- 2. Description ---
    if (!data.description || data.description.length < 15) {
      errors.description =
        "Please provide a description of at least 15 characters.";
    }

    // --- 3. Observations ---

    // --- 4. Address ---
    if (!data.address || data.address.length < 10) {
      errors.address = "Address required with a minimum of 10 characters.";
    }

    // --- 5. Preferred Date ---
    if (!data.preferredDate) {
      errors.preferredDate = "A preferred date must be specified.";
    } else {
      const selectedDate = new Date(data.preferredDate);
      if (selectedDate <= today) {
        errors.preferredDate = "The preferred date should be in the future.";
      }
    }

    // --- 6. Budget ---
    const budgetValue = parseFloat(data.budget);
    if (!budgetValue || budgetValue <= 0) {
      errors.budget = "The budget is required and must be a positive value.";
    }

    // --- 7. Images ---
    if (data.images.length === 0) {
      errors.images = "You must upload at least one file.";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Verification application
    const errors = validateForm(formData);

    // 2. Update error status
    setValidationErrors(errors);

    // 3. Check for errors before submitting
    if (Object.keys(errors).length > 0) {
      console.log("Validation Errors:", errors);
      alert("Please correct errors in the form before submitting.");
      return;
    }

    // API Integration Point - If the model is valid
    console.log("Form Data Submitted:", formData);
    alert("Service request sent successfully!");

    // ...; code to send data to the server (fetch/axios)
  };

  // --------------- RETURN JSX --------------- //
  // --------------- RETURN JSX --------------- //
  // --------------- RETURN JSX --------------- //
  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h2 className="display-4 fw-bold text-dark">Post a Service Request</h2>
        <p className="lead">Let's find the right professional for your job.</p>
      </div>

      <Row
        className="justify-content-center p-5 m-3"
        style={{
          boxShadow: "0 0 25px 15px rgba(237, 178, 41, 0.26)",
        }}
      >
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            {/* 1. Title */}
            <Form.Group className="mb-4">
              <Form.Label>Title</Form.Label>
              <FloatingLabel controlId="titleInput" label="Title">
                <Form.Control
                  type="text"
                  placeholder="e.g., Custom Bookshelf Installation"
                  size="lg"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="custom-form-control rounded-pill"
                  isInvalid={!!validationErrors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.title}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            {/* 2. Description */}
            <Form.Group className="mb-4">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Describe the service you need in detail..."
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="large-radius custom-form-control"
                isInvalid={!!validationErrors.description}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.description}
              </Form.Control.Feedback>
            </Form.Group>

            {/* 3. Observations */}
            <Form.Group className="mb-4">
              <Form.Label>Observations</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Are there any specific details, obstacles, or access instructions?"
                name="observations"
                value={formData.observations}
                onChange={handleChange}
                className="large-radius custom-form-control"
              />
            </Form.Group>

            {/* 4. Address */}
            <Form.Group className="mb-4">
              <Form.Label>Address</Form.Label>
              <FloatingLabel controlId="addressInput" label="Address">
                <Form.Control
                  type="text"
                  placeholder="Enter your full address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="custom-form-control rounded-pill"
                  isInvalid={!!validationErrors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.address}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Row>
              {/* 5. Preferred Date */}
              <Form.Group as={Col} md={6} className="mb-4">
                <Form.Label>Preferred Date</Form.Label>
                <Form.Control
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="rounded-pill custom-form-control"
                  isInvalid={!!validationErrors.preferredDate}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.preferredDate}
                </Form.Control.Feedback>
              </Form.Group>

              {/* 6. Budget */}
              <Form.Group as={Col} md={6} className="mb-4">
                <Form.Label>Budget</Form.Label>
                <InputGroup hasValidation>
                  {/* Currency Select */}

                  <DropdownButton
                    variant="outline-warning"
                    title={formData.currency}
                    as={InputGroup.Prepend}
                    id="input-group-currency-select"
                    className="currency-dropdown"
                  >
                    {["EGP", "USD", "SAR"].map((currency) => (
                      <Dropdown.Item
                        key={currency}
                        onClick={() =>
                          handleChange({
                            target: { name: "currency", value: currency },
                          })
                        }
                        active={formData.currency === currency}
                      >
                        {currency}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>

                  {/* Budget Input */}
                  <Form.Control
                    type="text"
                    placeholder="0.00"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="custom-form-control"
                    isInvalid={!!validationErrors.budget}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {validationErrors.budget}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            {/* 7. Image Upload */}
            <Form.Group className="mb-4">
              <Form.Label>Image Upload</Form.Label>
              <div
                className={`border border-2 rounded-3 p-5 text-center file-upload-box ${
                  validationErrors.images ? "border-danger" : "border-secondary"
                }`}
              >
                <i className="fas fa-image fa-3x text-muted mb-3"></i>

                <input
                  className="d-none"
                  id="file-upload"
                  multiple
                  name="images"
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleChange}
                />

                <label
                  htmlFor="file-upload"
                  style={{ cursor: "pointer" }}
                  className="d-block mb-1 text-primary fw-bold"
                >
                  Upload a file
                </label>

                {formData.images.length > 0 ? (
                  <small className="d-block text-success">
                    {formData.images.length} file(s) selected.
                  </small>
                ) : (
                  <small className="d-block text-muted">
                    or drag and drop (PNG, JPG, GIF up to 10MB)
                  </small>
                )}
              </div>
              {validationErrors.images && (
                <div className="invalid-feedback d-block">
                  {validationErrors.images}
                </div>
              )}
            </Form.Group>

            {/* 8. Submit Button */}
            <Button
              variant="warning"
              type="submit"
              className="w-100 main-btn p-3 mt-4"
            >
              Post Request
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
