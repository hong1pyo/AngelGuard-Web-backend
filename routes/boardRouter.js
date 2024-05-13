const express = require("express");
const boardController = require("../controllers/boardController");
const boardRouter = express.Router();

boardRouter.get("/", boardController.selectBoardList);
boardRouter.get("/:board_id", boardController.selectBoard);
boardRouter.post("/write", boardController.createBoard);
boardRouter.get("/update/:board_id", boardController.updateBoard);
boardRouter.put("/update/:board_id", boardController.updateBoardProcess);
module.exports = boardRouter;
