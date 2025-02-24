const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const Customers = require('./models/customer')
const bycrypt = require('bcrypt')

const saltRounds = 5;
const userdic = {}

const app = express()

app.use("*", bodyParser.json())

//Add a new Customer
app.post('/api/add_customer', async (req, res) => {
    const data = req.body;

    try {
        const existingCustomer = await Customers.find({ name: data.name });

        if (typeof existingCustomer !== undefined) {
            return res.status(401).send('User already exists')
        }

        const hashpassword = await bycrypt(data.password, saltRounds)
        userdic[data.name] = { hashpassword }

        const newCustomer = new Customers({
            name: data.name,
            email: data.email,
            password: hashpassword
        });

        await newCustomer.save();

        res.status(201).send(`User ${data.name} registered successfully`)

    } catch (err) {
        return res.status(500).send('Server error');
    }

})