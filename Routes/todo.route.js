const express = require("express");
const jwt = require("jsonwebtoken");

const TodoController = require("../Controller/todo.controller");

const router = express.Router();

router.get("/", authenticateToken, TodoController.getTodos);

router.post("/", authenticateToken, TodoController.createNewTodo);

router.put("/:id", authenticateToken, TodoController.updateTodo);

router.delete("/:id", authenticateToken, TodoController.deleteTodo);

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWTPRIVATEKEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(req.user);
    next();
  });
}

module.exports = router;
