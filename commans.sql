-- Create table Question with question id as primary key having bool to have a pic or not and a text as a question which also contaoin marks
CREATE TABLE IF NOT EXISTS question (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    question_num INTEGER,
    has_pic BOOLEAN,
    can_show BOOLEAN,
    content TEXT,
    pic TEXT,
    answer TEXT,
    marks INTEGER
);

-- user table
-- Language: sql
-- Path: commans.sql
-- Create table User with user id as primary key having username, password and email as user details
CREATE TABLE IF NOT EXISTS user (
    id varchar(64) PRIMARY KEY,
    username TEXT,
    email TEXT,
    curr_ques INTEGER,
    last_time DATETIME
);