const comments = require("../models/comment");

module.exports = {
    // 댓글 목록
    selectComments: async function (req, res, next) {
        await comments
            .selectComments(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                next(err);
            });
    },
    // 댓글 생성
    createComment: async function (req, res, next) {
        await comments
            .createComment(req)
            .then((result) => {
                res.status(200).json({ message: result });
            })
            .catch((err) => {
                next(err);
            });
    },
    // 댓글 수정(조회)
    updateComment: async function (req, res, next) {
        await comments
            .updateComment(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                next(err);
            });
    },
    // 댓글 수정
    updateCommentProcess: async function (req, res, next) {
        await comments
            .updateCommentProcess(req)
            .then((result) => {
                res.status(200).json({ message: result });
            })
            .catch((err) => {
                next(err);
            });
    },
    // 댓글 삭제
    deleteComment: async function (req, res, next) {
        await comments
            .deleteComment(req)
            .then((result) => {
                if (result) {
                    res.status(200).json({ message: result });
                } else {
                    next(err);
                }
            })
            .catch((err) => {
                next(err);
            });
    },
};
