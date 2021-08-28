const express = require('express');
const router = express.Router();

var userDb=require('../database/user');
let userDbConnect;

const userRouter = DBConnect => {
    userDbConnect=userDb(DBConnect);
    return router;
};

router.get('/question', (req, res) => {
    userDbConnect.getQuestion(1)
        .then(question => {
            question.answer = '';
            res.status(200).send(question);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});
// check answer
router.get('/question/:num/check', (req, res) => {
    userDbConnect.getAnswer(req.params.num)
        .then(result => {
            if(result===req.body.answer) {
                userDbConnect.updateCount(1,req.params.num)
                .then(result => {                
                    res.status(200).send({result:true});
                })
                .catch(err => {
                    res.status(500).send(err);
                });
            } else {
                res.status(200).send({result:false});
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// get leaderboard
router.get('/leaderboard', (req, res) => {
    userDbConnect.getLeaderboard(req.body.limit || 0)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});


module.exports = userRouter;
