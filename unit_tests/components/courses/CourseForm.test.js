// Unit Tests for React Component "CourseForm"
// using @testing-library/react

import React from "react";
import { cleanup, render } from "@testing-library/react";
import CourseForm from "../../../src/components/courses/CourseForm";

afterEach(cleanup);

// Factory to render our React Component
function renderCourseForm(args) {
  let defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

// Test to render CourseForm component
// with expected "Add Course" Form
it("should render Add Course header", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Course");
});

// Test to render CourseForm component
// with expected "Save" button label
it("should label save button as 'Save' when not saving", () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
});

// Test to render CourseForm component
// with expected "Saving..." button label when it is saving
it("should label save button as 'Saving...' when saving", () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText("Saving...");
});
