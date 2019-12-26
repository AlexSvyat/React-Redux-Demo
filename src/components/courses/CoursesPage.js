import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  componentDidMount() {
    this.props.actions.loadCourses().catch(error => {
      alert("Error loading courses: " + error);
    });
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
  // Be specific, request only the data
  // your component needs
  return { courses: state.courses };
}

// This Redux function determines what actions
// are available on props in our component
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

// Connect to Redux Store
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
