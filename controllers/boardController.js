const boards = require("../models/board");

module.exports = {
    // 게시글 목록
    selectBoardList: async function (req, res, next) {
        await boards
            .selectBoardList(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                next(err);
            });
    },
    // 게시글 상세
    selectBoard: async function (req, res, next) {
        await boards
            .selectBoard(req)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                next(err);
            });
    },
    // 게시글 생성
    createBoard: async function (req, res, next) {
        await boards
            .createBoard(req)
            .then((result) => {
                res.redirect(`/board/${result}`);
            })
            .catch((err) => {
                next(err);
            });
    },
    // 게시글 업데이트(조회)
    updateBoard: async function (req, res, next) {
        await boards
            .updateBoard(req)
            .then((result) => {
                const data = result[0];
                const html = `
                <html>
                <form action="/board/update/${data.board_id}" method="post">
                <input type="hidden" name="_method" value="PUT"/>
                <label for="user_id">User ID:</label>
                <input type="hidden" id="user_id" name="user_id" value="${data.user_id}"><br><br>
                <label for="board_title">Board Title:</label>
                <input type="text" id="board_title" name="board_title" value="${data.board_title}"><br><br>
                <label for="board_content">Board Content:</label><br>
                <textarea id="board_content" name="board_content">${data.board_content}</textarea><br><br>
                <input type="submit" value="Submit">
                </form></html>`;
                res.send(html);
            })
            .catch((err) => {
                next(err);
            });
    },
    // 게시글 업데이트
    updateBoardProcess: async function (req, res, next) {
        await boards
            .updateBoardProcess(req)
            .then((result) => {
                res.redirect(`/board/${result}`);
            })
            .catch((err) => {
                next(err);
            });
    },
};
