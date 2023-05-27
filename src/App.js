import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: '127.0.0.1',
    database: 'quiz_db',
    user: 'root',
    password: '',
});

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

app.get('/getQuizQuestions', (req, res) => {
    connection.connect((err) => {
        if (err){
            throw err;
        }
        connection.query('SELECT * FROM questions', (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    })
});

app.get('/getQuizChoices', (req, res) => {
    connection.connect((err) => {
        if (err) throw err;
        const sql = 'SELECT * FROM choices'
        connection.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    })
});

app.post('/postQuizAnswers', (req, res) => {
    const {result} = req.body;
    const resArr = (Object.entries(result));

    const finalResult = resArr.map(el => {
        return el[1].choice;
    }).join();

    connection.connect((err) => {
        if (err) throw err;
        const sql = 'INSERT INTO answers VALUES (id, ?)';
        connection.query(sql, [finalResult], (err, result) => {
            if (err) throw err;
        })
        res.send()
    })
})

app.get('/getQuizAnswers', (req, res) => {
    connection.connect((err) => {
        if (err) throw err;
        const sql = 'SELECT answers FROM answers'
        connection.query(sql, (err, result) => {
            if (err) throw err;
            const tempArr0 = [];
            const tempArr1 = [];
            const tempArr2 = [];
            const tempArr3 = [];
            const tempArr4 = [];

            result.forEach(({answers}) => {
                answers.split(',').forEach((el, index) => {

                    switch(index){
                        case 0:
                            tempArr0.push(el);
                            break;
                        case 1:
                            tempArr1.push(el);
                            break;
                        case 2:
                            tempArr2.push(el);
                            break;
                        case 3:
                            tempArr3.push(el);
                            break;
                        case 4:
                            tempArr4.push(el);
                            break;
                    }
                })
            })

            const allAnswersArr = [];
            allAnswersArr.push(tempArr0, tempArr1, tempArr2, tempArr3, tempArr4);
            console.log(allAnswersArr)

            console.log(tempArr0, tempArr1, tempArr2, tempArr3 && tempArr4);
            // console.log(result);
            res.send(allAnswersArr);
        })
    })
})

app.listen(3001, () => {
    console.log(`server running on port ${port}`);
});