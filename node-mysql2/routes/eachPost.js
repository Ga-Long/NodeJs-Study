const express = require('express');
const Board = require('../models/board');

const router = express.Router();

router.get('/eachPost', async (req, res, next) => { //해당 id의 content 불러오기
    try {
        const boards = await Board.findAll({
            where: { id: req.params.id },
        });
        //eachPost로 가야되는대 
        res.render('eachPost', {boards}); 

        console.log(boards);
        res.json(boards);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;