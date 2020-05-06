const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

let students = [{
    "studentid":"1",
    "studentname": "rakesh",
    "fathersname":"goku",
    "dob":"2014-12-14",
    "street":"kamaraj",
    "address": "chennai",
    "phone":"1234"

},
{
    "studentid":"2",
    "studentname": "rakeshkanna",
    "fathersname":"vegeta",
    "dob":"2012-12-14",
    "street":"kamarajan",
    "address": "mumbai",
    "phone":"12345"
},
{"studentid":"3",
"studentname": "rakeshkannan",
"fathersname":"gojeta",
"dob":"2019-12-14",
"street":"kamar",
"address": "hyderabad",
"phone":"123456"

}

]

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());
app.post('/student',(req,res)=>{
    const student = req.body;
    console.log(student);
    students.push(student);
    res.send('student is added to the database');
});


app.get('/student',(req,res)=>{
    res.json(students);
});

app.get('/student/:studentid',(req,res)=>{
    //reading.isbn from the url
    const studentid= req.params.studentid;

    //searching books for the isbn
    for(let student of students){
        if(student.studentid === studentid)
        {
            res.json(studentid);
            return;
        }
    }
    res.status(404).send('students are not found');

});
app.delete('/student/:studentid',(req,res)=>{
    const studentid =req.params.studentid;
    //remove data item from the book array
    students = students.filter(i=>{
        if(i.studentid !== studentid){
            return true;
        }
        return false;
    });
    res.send('student is deleted');
});
//we can edit the datas with both post and put
app.put('/student/:studentid',(req,res)=>{
    //reading isbn from the url
    const studentid = req.params.studentid;
    const newstudent = req.body;

    //remove item from the books array
    for(let i=0; i<students.length;i++)
    {
        let student= students[i]
        if(student.studentid === studentid){
            students[i] = newstudent;
        }
    }
    //sending 404 when not found
    res.send('student is edited');
});
app.listen(port,()=>console.log(`hello world listening on port ${port}!`));