const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_COURSES_QUERY = 'SELECT * FROM course';

const SELECT_ALL_TESTS_QUERY = 'SELECT * FROM test';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ess_db'
});

connection.connect(err => {
    if(err){
        return err;
    }
});

//console.log(connection);

app.use(cors());

app.get('/', (req,res) => {
  res.send('go to /courses to see courses')
});


//add course request
app.get('/courses/add', (req,res) => {
    const { id, name, domain, description } = req.query;
    const INSERT_COURSES_QUERY = `INSERT INTO course(name, domain, description) VALUES('${name}', '${domain}', '${description}')`;
    console.log(id,name,domain,description);
    connection.query(INSERT_COURSES_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else{
            return res.send('successfully added course')
        }
    });

});

//display all courses
app.get('/courses',(req,res) => {
    connection.query(SELECT_ALL_COURSES_QUERY, (err, results) => {
        if(err){
            console.log("there is an error");
            return res.send(err)
            

        }
        else{
            return res.json({
                data: results
            })
        }
    })
})

//delete course request
app.get('/courses/delete',(req,res) => {
    const {name} = req.query;
    const DELETE_COURSE_QUERY = `DELETE FROM course WHERE name = '${name}'`;
    connection.query(DELETE_COURSE_QUERY, (err, results) => {
        if(err){
            console.log("there is a deletion error");
            return res.send(err)
            

        }
        else{
            return res.json({
                data: results
            })
        }
    })
})

//update course request
app.get('/courses/update',(req,res) => {
    const {name, description} = req.query;
    const UPDATE_COURSE_QUERY = `UPDATE course SET description ='${description}' WHERE name = '${name}'`;
    connection.query(UPDATE_COURSE_QUERY, (err, results) => {
        if(err){
            console.log({name})
            console.log({description})
            console.log("there is an update error");
            return res.send(err)
            

        }
        else{
            return res.json({
                data: results
            })
        }
    })
})

app.get('/tests/add', (req,res) => {
    const { id, course_id, name, num_of_questions, duration } = req.query;
    const INSERT_TESTS_QUERY = `INSERT INTO test(course_id, name, num_of_questions, duration) VALUES('${course_id}', '${name}', '${num_of_questions}', '${duration}')`;
    console.log(id,course_id,name,num_of_questions,duration);
    connection.query(INSERT_TESTS_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else{
            return res.send('successfully added test')
        }
    });

});

app.get('/tests',(req,res) => {
    connection.query(SELECT_ALL_TESTS_QUERY, (err, results) => {
        if(err){
            console.log("there is an error");
            return res.send(err)
            

        }
        else{
            return res.json({
                data: results
            })
        }
    })
})

app.listen(4000, () => {
  console.log('server listening on port 4000')
});