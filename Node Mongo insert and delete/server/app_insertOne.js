const express = require("express")
const mongoose = require("mongoose")
const Employee = require("./employee.js")

const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/EmployeeDB").then(() => {
    console.log("Database connected")
})

//Insert One document
const employeeList = [
    { "emp_name": "Ray Renolds", "age": 32, "location": "Austin", "email": "rayr@somewhere.com" },
    { "emp_name": "Matt Aniston", "age": 25, "location": "Houston", "email": "matta@somewhere.com" },
    { "emp_name": "Monica Perry", "age": 23, "location": "New Jersey", "email": "monicap@somewhere.com" },
    { "emp_name": "Rachel Tribbiani", "age": 28, "location": "Boston", "email": "rachelt@somewhere.com" }
]

Employee.updateOne({ emp_name: "John Doe" }, { email: "beast@gmail.com" }).then((updateOneResult) => {
    console.log(updateOneResult)
    console.log("One document updated")

    return Employee.updateMany({ age: { $gt: 30 } }, { $set: { location: "ashaiman" } })
}).then((EmployeesUpdated) => {

    console.log(EmployeesUpdated)
    console.log("Many Updated")

}).catch((error) => {

    console.log(error)

}).finally(() => {

    mongoose.connection.close()
    console.log("Connection closed")
})

/* Employee.insertMany(employeeList).then(() => {
    console.log("Employee List inserted")

    return Employee.find()
}).then((data) => {
    console.log("List of Employees")
    console.log(data)
}).catch((error) => {
    console.log(err)
}).finally(() => {
    mongoose.connection.close()

    console.log("Connection Closed")
}) */



const PORT = 3001

app.listen(PORT, () => {
    console.log("Server is Running Thank God")
})