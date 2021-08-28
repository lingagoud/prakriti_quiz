const admin = dbConnect => {
    const getAllQuestions= () =>{
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM question`;
            dbConnect.query(query,(error, results, _fields) => {
                if (error) {
                    console.log(error);
                    reject('Failed');
                    return;
                }
                resolve(results);
            });
        });
    }

    // Add Question
const addQuestion = (question) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO question (
                question_num,
                has_pic,
                content,
                pic,
                answer,
                marks) VALUES (
                    ${dbConnect.escape(question.question_num)},
                    ${dbConnect.escape(question.has_pic)},
                    ${dbConnect.escape(question.content)},
                    ${dbConnect.escape(question.pic)},
                    ${dbConnect.escape(question.answer)},
                    ${dbConnect.escape(question.marks)}    
                )`;
            dbConnect.query(query,(error, results, _fields) => {
                if (error) {
                    console.log(error);
                    reject('Failed');
                    return;
                }
                resolve();
            });
        });
    }

    // edit Question
    const editQuestion = (id,question) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE question SET
                question_num = ${dbConnect.escape(question.question_num)},
                has_pic = ${dbConnect.escape(question.has_pic)},
                content = ${dbConnect.escape(question.content)},
                pic = ${dbConnect.escape(question.pic)},
                answer = ${dbConnect.escape(question.answer)},
                marks = ${dbConnect.escape(question.marks)}
                WHERE id = ${dbConnect.escape(id)}`;
            dbConnect.query(query,(error, results, _fields) => {
                if (error) {
                    console.log(error);
                    reject('Failed');
                    return;
                }
                resolve(results);
            });
        });
    }
    // Hide Question
    const showHideToogleQuestion = (id,newState) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE question SET
                can_show = ${newState}
                WHERE id = ${dbConnect.escape(id)}`;
            dbConnect.query(query,(error, results, _fields) => {
                if (error) {
                    console.log(error);
                    reject('Failed');
                    return;
                }
                resolve(results);
            });
        });
    }
    // Delete Question
    const deleteQuestion = (id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM question WHERE id = ${dbConnect.escape(id)}`;
            dbConnect.query(query,(error, results, _fields) => {
                if (error) {
                    console.log(error);
                    reject('Failed');
                    return;
                }
                resolve(results);
            });
        });
    }

    return {
        getAllQuestions,
        addQuestion,
        editQuestion,
        showHideToogleQuestion,
        deleteQuestion
    };
};

module.exports = admin;