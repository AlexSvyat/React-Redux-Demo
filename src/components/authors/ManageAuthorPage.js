import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors, saveAuthor } from "../../redux/actions/authorActions";
import { newAuthor } from "../common/DataModel";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import AuthorForm from "./AuthorForm";

// Exporting un-connected version for Unit Testing
export function ManageAuthorPage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveAuthor,
  history,
  ...props
}) {
  const [author, setAuthor] = useState({ ...props.author });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Error loading courses: " + error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Error loading authors: " + error);
      });
    } else {
      // This will copy the author passed in on props
      // to state anytime a new author is passed in
      setAuthor({ ...props.author });
    }
  }, [props.course]);

  // Function to validate Author Form and provide instant
  // validation errors to a user
  function formIsValid() {
    const { name } = author;
    const error = {};

    if (!name) error.name = "Author Name is required!";

    setErrors(error);

    // Form is valid if the error object still has no properties
    return Object.keys(error).length === 0;
  }

  // Function to be passed to AuthorForm component
  // to handle Saving of the author into Redux Store
  function handleSave(event) {
    event.preventDefault();

    // Let's run Client Side validation on the Form values
    if (!formIsValid()) return;

    // Set local state var to indicate that Saving started
    setSaving(true);

    saveAuthor(author)
      .then(() => {
        // To show Toast notification to a user
        toast.success("Author saved.");

        // We're using React Router's history object to redirect
        // For redirection we can use <Redirect> or history to redirect
        history.push("/authors");
      })
      .catch(error => {
        // Resetting Save button back to false, for user to retry
        setSaving(false);

        // Returning error message in a CourseForm Error Div
        setErrors({ onSave: error.message });
      });
  }

  // Function to be passed to AuthorForm component
  // to handle Change of Author data
  function handleChange(event) {
    // This destructuring avoids the event getting garbage collected
    // so that it's available within the nested setAuthor callback
    const { name, value } = event.target;

    setAuthor(prevAuthor => ({
      ...prevAuthor,
      // Using JS computed property syntax, it allows us
      // to reference a property via a variable
      [name]: name === "id" ? parseInt(value, 10) : value
    }));
  }

  return (authors.length === 0) | (courses.length === 0) ? (
    <Spinner />
  ) : (
    <AuthorForm
      author={author}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

// Selector function to select data from the Redux store
function getAuthorBySlug(authors, slug) {
  return authors.find(author => author.name === slug) || null;
}

// This Redux function determines what state is passed
// to our components via props
// We also accessing React own props as 2nd parameter
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;

  // We're adding checking if courses are loaded
  // as they get loaded from async calls
  const author =
    slug && state.authors.length > 0
      ? getAuthorBySlug(state.authors, slug)
      : newAuthor;
  return {
    author: author,
    courses: state.courses,
    authors: state.authors
  };
}

// This Redux function/object determines what actions
// are available on props in our component
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveAuthor
};

// Exporting Connected Version to be used in App
// Connect to Redux Store
export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
