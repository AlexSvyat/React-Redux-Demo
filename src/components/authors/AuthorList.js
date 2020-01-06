import React from "react";
import { Link } from "react-router-dom";

const AuthorList = ({ authors, coursesCount, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Count of Courses</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {authors.map(author => {
        return (
          <tr key={author.name}>
            <td>
              <Link to={"/author/" + author.name}>{author.name}</Link>
            </td>
            <td>{coursesCount}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(author)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default AuthorList;
