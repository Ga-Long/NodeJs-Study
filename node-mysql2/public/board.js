// 사용자 이름 눌렀을 때 댓글 로딩
document.querySelectorAll("#board-list tr").forEach((el) => {
    el.addEventListener("click", function () {
    const id = el.querySelector("td").textContent;
    getPost(id);
    });
});

// 내용 로딩
async function getPost(id) {
    try {
    const res = await axios.get(`/board/${id}/content`);
    const boards = res.data;
    const tbody = document.querySelector('#eachPost_list tbody');
    tbody.innerHTML = '';
    //console.log(boards);
    
    boards.map(function(board){

        const eachPost = document.createElement('div');

        let title = document.createElement('div');
        title.textContent = board.title;
        eachPost.appendChild(title);

        let division = document.createElement('div');
        division.textContent = board.division;
        eachPost.appendChild(division);

        let writer = document.createElement('div');
        writer.textContent = board.writer;
        eachPost.appendChild(writer);

        let created_at = document.createElement('div');
        created_at.textContent = board.created_at;
        eachPost.appendChild(created_at);

        let content = document.createElement('div');
        content.textContent = board.content;
        eachPost.appendChild(content);
        
        tbody.appendChild(eachPost);
    })

    } catch (err) {
    console.error(err);
    }
}

// // 게시글 등록 시
// document.getElementById('write-form').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const division = e.target.division.value;
//     const title = e.target.title.value;
//     const content = e.target.content.value;
//     const writer = e.target.writer.value;
//     const file = e.target.file.checked;
//     if (!division) {
//         return alert('구분을 입력하세요');
//     }
//     if (!title) {
//         return alert('제목을 입력하세요');
//     }
//     if (!content) {
//         return alert('내용을 입력하세요');
//     }
//     if (!writer) {
//         return alert('작성자를 입력하세요');
//     }
//     try {
//         await axios.post('/board', { division, title, content, writer});
//         getUser();
//     } catch (err) {
//         console.error(err);
//     }
//     e.target.division.value = '';
//     e.target.title.value = '';
//     e.target.content.value = '';
//     e.target.writer.value = '';
//     e.target.married.checked = false;
//   });