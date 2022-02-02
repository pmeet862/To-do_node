const express = require("express");

const TodoController = require("../Controller/todo.controller");

const router = express.Router();

router.get("/", TodoController.getTodos);

router.post("/", TodoController.createNewTodo);

router.put("/:id", TodoController.updateTodo);

router.delete("/:id", TodoController.deleteTodo);

module.exports = router;
