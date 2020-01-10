import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import CourseForm from "./CourseForm";
import { newCourse } from "../common/DataModel";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

// Exporting un-connected version for Unit Testing
export function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Error loading courses: " + error);
      });
    } else {
      // This will copy the course passed in on props
      // to state anytime a new course is passed in
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Error loading authors: " + error);
      });
    }
  }, [props.course]);

  // Function to validate Course Form and provide instant
  // validation errors to a user
  function formIsValid() {
    const { title, authorId, category } = course;
    const error = {};

    if (!title) error.title = "Title is required!";
    if (!authorId) error.author = "Author is required!";
    if (!category) error.category = "Category is required!";

    setErrors(error);

    // Form is valid if the error object still has no properties
    return Object.keys(error).length === 0;
  }

  // Function to be passed to CourseForm component
  // to handle Saving of the course into Redux Store
  function handleSave(event) {
    event.preventDefault();

    // Let's run Client Side validation on the Form values
    if (!formIsValid()) return;

    // Set local state var to indicate that Saving started
    setSaving(true);

    saveCourse(course)
      .then(() => {
        // To show Toast notification to a user
        toast.success("Course saved.");

        // We're using React Router's history object to redirect
        // For redirection we can use <Redirect> or history to redirect
        history.push("/courses");
      })
      .catch(error => {
        // Resetting Save button back to false, for user to retry
        setSaving(false);

        // Returning error message in a CourseForm Error Div
        setErrors({ onSave: error.message });
      });
  }

  // Function to be passed to CourseForm component
  // to handle Change of Course data
  function handleChange(event) {
    // This destructuring avoids the event getting garbage collected
    // so that it's available within the nested setCourse callback
    const { name, value } = event.target;

    setCourse(prevCourse => ({
      ...prevCourse,
      // Using JS computed property syntax, it allows us
      // to reference a property via a variable
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }
  return (authors.length === 0) | (courses.length === 0) ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

// Selector function to select data from the Redux store
function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

// This Redux function determines what state is passed
// to our components via props
// We also accessing React own props as 2nd parameter
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;

  // We're adding checking if courses are loaded
  // as they get loaded from async calls
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course: course,
    courses: state.courses,
    authors: state.authors
  };
}

// This Redux function/object determines what actions
// are available on props in our component
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
};

// Exporting Connected Version to be used in App
// Connect to Redux Store
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
