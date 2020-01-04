import { createStore } from "redux";
import rootReducer from "../../src/redux/reducers";
import initialState from "../../src/redux/reducers/initialState";
import * as courseActions from "../../src/redux/actions/courseActions";

// Integration test for testing all the Redux components together in
// Redux Store
it("should handle creating courses", () => {
  // Arrange
  const store = createStore(rootReducer, initialState);
  const course = {
    title: "Test Course"
  };

  // Act
  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);

  // Assert
  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(course);
});
