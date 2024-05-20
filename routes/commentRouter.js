const express = require("express");
const commentController = require("../controllers/commentController");
const commentRouter = express.Router();

commentRouter.get("/:board_id", commentController.selectComments);
commentRouter.post("/write", commentController.createComment);
commentRouter.get("/update/:comment_id", commentController.updateComment);
commentRouter.put("/update/:comment_id", commentController.updateCommentProcess);
commentRouter.delete("/:comment_id", commentController.deleteComment);

module.exports = commentRouter;
