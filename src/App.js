import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: '127.0.0.1',
    database: 'quiz_db',
    user: 'root',
    password: '',
});

//ES6 = () => {}
//ES5 = function () {}

// function qqq (sql, cb){
//     const result = async callDatabase(sql);
//     cb('err', result);
//     cleanUpDatabaseConnection();
//
// }


function bajs(thisIsTotallyNot123, y, z){
    console.log(thisIsTotallyNot123)
}

const app = express();
const port = 3001;
app.use(cors());

app.get('/getQuizQuestions', (req, res) => {
    connection.connect((err) => {
        if (err) throw err;
        connection.query('SELECT * FROM questions', (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    })
});

app.get('/getQuizChoices', (req, res) => {
    res.send(
        [
            {
                id: '0',
                name: 'Fellan'
            },
            {
                id: '1',
                name: 'Ante'
            },
            {
                id: '2',
                name: 'Omar'
            },
            {
                id: '3',
                name: 'Beetle'
            },
        ]
    )
});


// localhost:3001/getQuizQuestions
app.listen(3001, () => {
    console.log(`server running on port ${port}`);
});