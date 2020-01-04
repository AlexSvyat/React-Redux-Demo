import courseReducer from "../../../src/redux/reducers/courseReducer";
import * as courseActions from "../../../src/redux/actions/courseActions";

// Unit Test for testing courseReducer for adding new Course
it("should add course when passed CREATE_COURSE_SUCCESS", () => {
  // Arrange
  const initialState = [
    {
      title: "A"
    },
    {
      title: "B"
    }
  ];

  const newCourse = {
    title: "C"
  };

  const action = courseActions.createCourseSuccess(newCourse);

  // Act
  const newState = courseReducer(initialState, action);

  // Assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");
});

// Unit Test for testing courseReducer for updating existin Course
it("should update course when passed UPDATE_COURSE_SUCCESS", () => {
  // Arrange
  const initialState = [
    {
      id: 0,
      title: "A"
    },
    {
      id: 1,
      title: "B"
    }
  ];

  const courseToBeUpdated = {
    id: 1,
    title: "C"
  };

  const action = courseActions.updateCourseSuccess(courseToBeUpdated);

  // Act
  const newState = courseReducer(initialState, action);

  // Assert
  expect(newState.length).toEqual(2);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("C");
});
