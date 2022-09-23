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


router.get('/write', async (req, res, next) => {
    try {
    res.render('write', {  });
    } catch (err) {
    console.error(err);
    next(err);
    }
});

module.exports = router;