const express = require('express');
const Board = require('../models/board');
const multer = require("multer");
const path = require("path");

const router = express.Router();

// GET home page.
router.get('/', async (req, res, next) => {
    try {
        res.render('main', { });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//GET board page
router.get('/board', async (req, res, next) => { // /board 진입했을 때
    try {
        const board = await Board.findAll(); //board 데이터를 가져오고
        res.render('board', { board }); //해당 데이터를 board.html를 렌더링할 때 넘김
    } catch (err) {
        console.error(err);
        next(err);
    }
});

var storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"public/files/");
    },
    filename:function(req,file,cb){
        const ext = path.extname(file.originalname);
        cb(null,path.basename(file.originalname,ext)+"-"+Date.now()+ext);
    },
});
var upload=multer({storage:storage});



//글 작성
router.post('/board/write', upload.single("isFile"), async (req, res, next) => { //글 작성 후 렌더링 post
    try {
        console.log(req.file.filename);
        const file = `/files/${req.file.filename}`;
        console.log(file);
        Board.create({ //글 작성한 것 생성하고 
                division: req.body.division,
                title: req.body.title,
                content: req.body.content,
                writer: req.body.writer,
                isFile : file,
            })
            .then(result=>{
                res.redirect('board'); //게시판으로 redirect
            })
    } catch (err) {
        console.error(err);
        next(err);
    }
});   
//글 작성 페이지로
router.get('/board/write', async (req, res, next) => {
    try {
        res.render('write', {  });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/eachPost', async (req, res, next) => {
    try {
        res.render('eachPost', {  });
        console.log("eachPost call");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// router.get('/:id/content', async (req, res, next) => { //해당 id의 content 불러오기
//     try {
//     const boards = await Board.findAll({
//         where: { id: req.params.id },
//     });
//     //eachPost로 가야되는대 
//     res.render('eachPost', {boards}); //작성하고 게시판으로 돌아가기

//     console.log(boards);
//     res.json(boards);
//     } catch (err) {
//     console.error(err);
//     next(err);
//     }
// });

module.exports = router;