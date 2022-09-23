const express = require('express');
const Board = require('../models/board');
//const Comment = require('../models/comment');

const router = express.Router();

router.post('/board', async (req, res, next) => {
    try {
        const board = await Board.create({
            division: req.body.division,
            title: req.body.title,
            content: req.body.content,
            writer: req.body.writer,
        });
        console.log(board);
        res.status(201).json(board);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


// router.route('/board')
//     .get(async (req, res, next) => {
//     try {
//         const board = await Board.findAll();
//         res.json(board);
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
//     })
//     .post(async (req, res, next) => {
//     try {
//         const board = await Board.create({
//         division: req.body.division,
//         title: req.body.title,
//         content: req.body.content,
//         writer: req.body.writer,
//         });
//         console.log(board);
//         res.status(201).json(board);
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
//     });

// router.get('/:id/comments', async (req, res, next) => {
//     try {
//     const comments = await Comment.findAll({
//         include: {
//         model: User,
//         where: { id: req.params.id },
//         },
//     });
//     console.log(comments);
//     res.json(comments);
//     } catch (err) {
//     console.error(err);
//     next(err);
//     }
// });

module.exports = router;
