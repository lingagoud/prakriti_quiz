const express = require('express');
const router = express.Router();

var adminDb=require('../database/admin');
let adminDbConnect;

const adminRouter = DBConnect => {
    adminDbConnect=adminDb(DBConnect);
    return router;
};
  
router.get('/questions', (req, res) => {
    adminDbConnect.getAllQuestions()
        .then(questions => {
            res.status(200).send(questions);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});
router.post('/questions', (req, res) => {
    console.log(req.body);
    adminDbConnect.addQuestion(req.body)
        .then(() => {
            res.status(200).send("done");
        })
        .catch(err => {
            res.status(500).send(err);
        });
});
router.put('/questions/:id', (req, res) => {
    adminDbConnect.editQuestion(req.params.id, req.body)
        .then(() => {
            res.status(200).send("done");
        })
        .catch(err => {
            res.status(500).send(err);
        });
});
router.delete('/questions/:id', (req, res) => {
    adminDbConnect.deleteQuestion(req.params.id)
        .then(() => {
            res.status(200).send("done");
        })
        .catch(err => {
            res.status(500).send(err);
        });
});
// show question
router.put('/questions/:id/status', (req, res) => {
    adminDbConnect.showHideToogleQuestion(req.params.id, req.body.status)
        .then(() => {   
            res.status(200).send("done");
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

module.exports = adminRouter;
