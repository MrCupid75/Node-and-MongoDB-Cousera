const mongoose = require('mongoose');
const express = require('express');
const Employee = require('./employee');
const bodyParser = require('body-parser');


const uri = "mongodb://127.0.0.1:27017/employeeDB";

mongoose.connect(uri).then(() => {
    console.log("Database connected");
});

app = express()

app.use("*", bodyParser.json());

//GET all employees
app.get('/api/employess', async (req, res) => {

    try {
        const documents = await Employee.find();
        res.json(documents);
    } catch {
        res.status(500).json({ message: "Error in server" })
    }

})

//Add an Employee
app.post('/api/add_employee', async (req, res) => {
    const document = {
        "name": req.body.name,
        "age": req.body.age,
        "location": req.body.location,
        "email": req.body.email

    }

    const newEmployee = new Employee(document)

    await newEmployee.save();
    res.status(200).json({ message: `Employee ${document.name} added sucessfully` })

})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

