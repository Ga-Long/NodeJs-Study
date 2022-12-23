const express = require('express');
const Board = require('../models/board');


const router = express.Router();

//board
router.get('/board', async (req, res, next) => { // /board 진입했을 때
    try {
    const board = await Board.findAll(); //board 데이터를 가져오고
    res.render('board', { board }); //해당 데이터를 board.html를 렌더링할 때 넘김
    } catch (err) {
    console.error(err);
    next(err);
    }
});

//write
// router.post('/board/write', async (req, res, next) => { //글 작성 후 post
//     try {
//         const board = await Board.create({
//             division: req.body.division,
//             title: req.body.title,
//             content: req.body.content,
//             writer: req.body.writer,
//         });
//         console.log(board);
//         //res.status(201).json(board);
//         res.render('board', { board }); //작성하고 게시판으로 돌아가기
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// });    


//해당 content 보기 
router.get('/:id/content', async (req, res, next) => { //해당 id의 content 불러오기
    try {
        const boards = await Board.findAll({
            where: { id: req.params.id },
        });
        
        res.json(boards);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//eachPost
router.get('/:id', async (req, res, next) => { //해당 id의 content 불러오기
    try {
        const boards = await Board.findAll({
            where: { id: req.params.id },
        });
        await Board.increment({views:1},{where: { id: req.params.id }}) //클릭하면 1씩 증가
        res.render('eachPost',{boards}) //해당 데이터를 each.html를 렌더링할 때 넘김
        
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//edit
router.get('/:id/edit', async (req, res, next) => { //해당 id의 content 불러오기
    try {
        const boards = await Board.findAll({
            where: { id: req.params.id },
        });

        res.render('edit',{boards}) //해당 데이터를 each.html를 렌더링할 때 넘김
        
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//update
router.post('/:id/edit', async (req, res, next) => { //해당 id의 content 불러오기
    try { 
        const boards = await Board.update({
            division: req.body.division,
            title: req.body.title,
            content: req.body.content,
            writer: req.body.writer,
        }, {
            where: { id: req.params.id },
        });
        
        res.redirect("/board/"+req.params.id) //해당 데이터를 each.html를 렌더링할 때 넘김
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//delete
router.post('/:id', async (req, res, next) => { //해당 id의 content 불러오기
    try { 
        const boards = await Board.destroy({
            where: { id: req.params.id },
        });  
        res.redirect("/board") //해당 데이터를 each.html를 렌더링할 때 넘김
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
