// 쿼리 저장
const db = require("../config/db");

module.exports = {
    selectComments: async function (req, res) {
        const sql = `SELECT user.user_nickname, comment_date, comment_content, user.user_id
                    FROM comment LEFT JOIN user ON comment.user_id WHERE board_id = ?`;
        const [rows] = await db.query(sql, [Number(req.params.board_id)]);

        return Object.setPrototypeOf(rows, []);
    },
    createComment: async function (req, res) {
        const sql = `INSERT INTO comment (board_id, user_id, comment_content, comment_date ) VALUES(?,?,?,NOW())`;
        const [rows] = await db.query(sql, [Number(req.body.board_id), Number(req.body.user_id), req.body.comment_content]);
        // return ??
        return true;
    },
    updateComment: async function (req, res) {
        const sql = `SELECT comment_content
        FROM comment WHERE comment_id = ?`;
        const [rows] = await db.query(sql, [Number(req.params.comment_id)]);
        return Object.setPrototypeOf(rows, []);
    },
    updateCommentProcess: async function (req, res) {
        const sql = `UPDATE comment SET comment_content=? WHERE comment_id =?`;
        const [rows] = await db.query(sql, [req.body.comment_content, Number(req.params.comment_id)]);
        // return ??
        return true;
    },
    deleteComment: async function (req, res) {
        const sql = `DELETE FROM comment WHERE comment_id=?`;
        const [rows] = await db.query(sql, [Number(req.params.comment_id)]);

        if (rows.affectedRows < 1) {
            console.log("Not Found");
            return false;
        }
        return true;
    },
};
