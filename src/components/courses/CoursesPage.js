import React from "react";
import { connect } from "react-redux";
import { loadCourses, deleteCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };
  componentDidMount() {
    const { courses, authors, loadCourses, loadAuthors } = this.props;

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
  }

  // Handler to  deal with Course Deletion
  // To be passed to Course List component
  handleDeleteCourse = course => {
    toast.success("Course deleted");
    this.props.deleteCourse(course).catch(error => {
      toast.error(
        "Failed to delete a course '" + course.title + "'! " + error.message,
        { autoClose: false }
      );
    });
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses:</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>

            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

// This Redux function determines what state is passed
// to our components via props
function mapStateToProps(state) {
  // We will map courses items to find a proper author
  // and return in a custom object as new prop
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors,

    // A prop to determine if API Call in Progress to show a Spinner
    loading: state.apiCallsInProgress > 0
  };
}

// This Redux function/object determines what actions
// are available on props in our component
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  deleteCourse
};

// Connect to Redux Store
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
