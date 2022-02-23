const createError = require("http-errors");
const mongoose = require("mongoose");

const Todo = require("../Models/todo.model");

module.exports = {
  getTodos: async (req, res) => {
    try {
      const results = await Todo.find({ userId: req.body.user._id });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewTodo: async (req, res) => {
    try {
      // const todo = new Todo(req.body);
      const { todos, userId } = req.body;
      const dataToSave = new Todo({ todos, userId });
      const result = await dataToSave.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },

  updateTodo: async (req, res) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const opt = { new: true };
      const result = await Todo.findByIdAndUpdate(id, updates, opt);
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },

  deleteTodo: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await Todo.findByIdAndDelete(id);
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },
};
