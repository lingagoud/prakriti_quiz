const user = dbConnect => {
    const getQuestion= (uid) =>{
        return new Promise((resolve, reject) => {
            const x=`harsha${uid}`;
            const query = `SELECT * FROM questions WHERE question_num = (SELECT curr_ques FROM users WHERE id = ${uid})`;
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

    const getAnswer = (num) =>{
        return new Promise((resolve, reject) => {
            const query = `SELECT answer from question where question_num=${dbConnect.escape(num)}`;
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
    const updateCount = (uid,num) =>{
        return new Promise((resolve, reject) => {
            const query = `UPDATE user SET curr_ques = curr_ques + 1 
            WHERE id=${dbConnect.escape(uid)} and curr_ques=${dbConnect.escape(num)} `;
            dbConnect.query(query,(error, results, _fields) => {
                if (error) {
                    console.log(error);
                    reject('Failed');
                    return;
                }
                resolve(1);
            });
        });
    }
    const getLeaderBoard = (limit) =>{
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM user 
            ORDER BY curr_ques DESC , last_time ASC
            ${limit<=0?'':`LIMIT ${dbConnect.escape(limit)}`}
            `;
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
        getQuestion,
        getAnswer,
        updateCount,
        getLeaderBoard
    };
};

module.exports = user;