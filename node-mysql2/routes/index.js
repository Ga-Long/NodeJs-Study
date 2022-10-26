const express = require('express');
const Board = require('../models/board');

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

router.post('/board', async (req, res, next) => { //글 작성 후 post
    try {
        const board = await Board.create({
            division: req.body.division,
            title: req.body.title,
            content: req.body.content,
            writer: req.body.writer,
        });
        //res.status(201).json(board);
        res.render('board', { board }); //작성하고 게시판으로 돌아가기
    } catch (err) {
        console.error(err);
        next(err);
    }
});   
//글 작성
router.get('/write', async (req, res, next) => {
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