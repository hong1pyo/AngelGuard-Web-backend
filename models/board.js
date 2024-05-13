// 쿼리 저장
const db = require("../config/db");

module.exports = {
    selectBoardList: async function (req, res) {
        const pageNum = Number(req.query.page) || 1; // 쿼리스트링으로 받을 페이지 번호 값, 기본값은 1
        const contentSize = 10; // 페이지에서 보여줄 컨텐츠 수.
        const pnSize = 10; // 페이지네이션 개수 설정.
        const skipSize = (pageNum - 1) * contentSize; // 다음 페이지 갈 때 건너뛸 리스트 개수.

        const sql = `SELECT count(*) AS count FROM board`;
        const [rows] = await db.query(sql);

        const totalCount = Number(rows.count); // 전체 글 개수.
        const pnTotal = Math.ceil(totalCount / contentSize); // 페이지네이션의 전체 카운트
        const pnStart = (Math.ceil(pageNum / pnSize) - 1) * pnSize + 1; // 현재 페이지의 페이지네이션 시작 번호.
        let pnEnd = pnStart + pnSize - 1; // 현재 페이지의 페이지네이션 끝 번호.

        const sql2 = "SELECT * FROM board LEFT JOIN user ON board.user_id = user.user_id ORDER BY board_id DESC LIMIT ?, ?";
        const [rows2] = await db.query(sql2, [skipSize, contentSize]);
        const result = {
            pageNum,
            pnStart,
            pnEnd,
            pnTotal,
            contents: rows2,
        };

        return result;
    },
    selectBoard: async function (req, res) {
        const sql = `SELECT * FROM board LEFT JOIN user ON board.user_id = user.user_id WHERE board_id = ?`;
        const [rows] = await db.query(sql, [Number(req.params.board_id)]);
        return Object.setPrototypeOf(rows, []);
    },
    createBoard: async function (req, res) {
        const sql = `INSERT INTO board (user_id, board_title, board_content, board_date) VALUES(?,?,?,NOW())`;
        const [rows] = await db.query(sql, [Number(req.body.user_id), req.body.board_title, req.body.board_content]);
        return Number(rows.insertId);
    },
    updateBoard: async function (req, res) {
        const sql = `SELECT * FROM board WHERE board_id = ?`;
        const [rows] = await db.query(sql, [Number(req.params.board_id)]);
        return Object.setPrototypeOf(rows, []);
    },
    updateBoardProcess: async function (req, res) {
        console.log(req.body);
        const sql = `UPDATE board board_title=?, board_content=? WHERE board_id = ?`;
        const [rows] = await db.query(sql, [req.body.board_title, req.body.board_content, Number(req.params.board_id)]);
        return Number(rows.insertId);
    },
};
