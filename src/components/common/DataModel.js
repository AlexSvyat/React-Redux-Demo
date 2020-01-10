const newCourse = {
  id: null,
  title: "",
  authorId: null,
  category: ""
};

const newAuthor = {
  id: null,
  name: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newCourse,
  newAuthor
};
