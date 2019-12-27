import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("Error loading courses: " + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Error loading authors: " + error);
      });
    }
  }

  render() {
    return (
      <>
        <h2>Courses:</h2>
        <CourseList courses={this.props.courses} />
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
    authors: state.authors
  };
}

// This Redux function determines what actions
// are available on props in our component
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}

// Connect to Redux Store
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
