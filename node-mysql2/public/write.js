// 사용자 이름 눌렀을 때 댓글 로딩
document.querySelectorAll("#board-list tr").forEach((el) => {
    el.addEventListener("click", function () {
    const id = el.querySelector("td").textContent;
    getComment(id);
    });
});

// 사용자 로딩
async function getBoard() {
    try {
    const res = await axios.get("/board");
    const boards = res.data;
    console.log(boards);
    const tbody = document.querySelector("#user-list tbody");
    tbody.innerHTML = "";
    boards.map(function (board) {
        const row = document.createElement("tr");
        row.addEventListener("click", () => {
        getComment(board.id);
        });
      // 로우 셀 추가
        let td = document.createElement("td");
        td.textContent = board.id;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = board.division;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = board.title;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = board.writer;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = board.created_at;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = board.views;
        row.appendChild(td);
        td = document.createElement("td");
        td.textContent = board.isFile ? "o" : "x";
        row.appendChild(td);
        tbody.appendChild(row);
    });
    } catch (err) {
    console.error(err);
    }
}
