import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors, deleteAuthor } from "../../redux/actions/authorActions";
import Spinner from "../common/Spinner";
import { Redirect } from "react-router-dom";
import AuthorList from "./AuthorList";
import { toast } from "react-toastify";

// Exporting un-connected version for Unit Testing
// All the deconstructed props are passed from below Redux functions:
// mapStateToProps and mapDispatchToProps
export function AuthorsPage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  deleteAuthor,
  ...props
}) {
  const [redirectToAddAuthorPage, setRedirectToAddAuthorPage] = useState(false);
  console.log(authors);
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
    }
  }, [props.course]);

  // Handler to  deal with Author Deletion
  // To be passed to Author List component
  function handleDeleteAuthor(author) {
    toast.success("Author deleted");
    deleteAuthor(author).catch(error => {
      toast.error(
        "Failed to delete an author '" + author.name + "'! " + error.message,
        { autoClose: false }
      );
    });
  }

  return authors.length === 0 ? (
    <Spinner />
  ) : (
    <>
      {redirectToAddAuthorPage && <Redirect to="/author" />}
      <button
        style={{ marginBottom: 20 }}
        className="btn btn-primary add-course"
        onClick={() => setRedirectToAddAuthorPage(true)}
      >
        Add Author
      </button>
      <AuthorList onDeleteClick={handleDeleteAuthor} authors={authors} />
    </>
  );
}

// This Redux function determines what state is passed
// to our components via props
// We also accessing React own props as 2nd parameter
function mapStateToProps(state) {
  // We will map authors items to find amount of courses
  // and return a custom object as new prop
  return {
    authors:
      state.courses.length === 0
        ? []
        : state.authors.map(author => {
            return {
              ...author,
              coursesCount: state.courses.filter(c => c.authorId === author.id)
                .length
            };
          }),
    courses: state.courses,
    // A prop to determine if API Call in Progress to show a Spinner
    loading: state.apiCallsInProgress > 0
  };
}

// This Redux function/object determines what actions
// are available on props in our component
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  deleteAuthor
};

// Exporting Connected Version to be used in App
// Connect to Redux Store
export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
