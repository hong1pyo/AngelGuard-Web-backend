const express = require("express");
const router = express.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.get("/test", function (req, res, next) {
    var html = `
    <html>
    <form action="/board/write" method="post">
    <label for="user_id">User ID:</label>
    <input type="hidden" id="user_id" name="user_id" value="1"><br><br>
    <label for="board_title">Board Title:</label>
    <input type="text" id="board_title" name="board_title" value="My Board"><br><br>
    <label for="board_content">Board Content:</label><br>
    <textarea id="board_content" name="board_content">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</textarea><br><br>
    <input type="submit" value="Submit">
</form></html>`;
    res.send(html);
});

router.use("/board", require("./boardRouter"));

module.exports = router;
