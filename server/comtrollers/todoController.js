const mongoose = require("mongoose");
const Todo = require("../models/todoModel");

const getTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find({}).sort({ createdAt: 1 });
    res.status(200).send(allTodos);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createTodo = async (req, res) => {
  const todo = req.body;
  try {
    const newTodo = new Todo(todo);
    const createdTodo = await newTodo.save();
    res.status(201).send(createdTodo);
    // const newTodo = await Todo.create(todo)
    // res.status(201).send(newTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    // const todo = await Todo.findById(id);
    // if (todo) {
    //   todo.text = req.body.text || todo.text;
    //   todo.completed = req.body.completed || todo.completed;
    //   const updatedTodo = await todo.save();
    //   res.status(201).send({
    //     _id: updatedTodo._id,
    //     text: updatedTodo.text,
    //     completed: updatedTodo.completed,
    //   });
    // } else {
    //   res.status(404).send(`There is no todo with the id of ${id}`);
    // }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`There is no todo with the id of ${id}`);
    }
    const todoId = { _id: id };
    const update = { completed: true };
    const updatedTodo = await Todo.findOneAndUpdate(todoId, update);
    if (!updateTodo) {
      return res.status(404).send(`There is no todo with the id of ${id}`);
    }
    res.status(201).send(updatedTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    // const todo = await Todo.findById(id);
    // if (todo) {
    //   await todo.remove();
    //   res.status(200).send(todo);
    // } else {
    //   res.status(404).send(`There is no todo with the id of ${id}`);
    // }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`There is no todo with the id of ${id}`);
    }
    const deletedTodo = await Todo.findOneAndDelete({ _id: id });
    res.status(200).send(deletedTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
