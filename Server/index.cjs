const cors = require('cors')
const express = require('express')
const { Client } = require('pg');

const PORT = 4000
const app = express()

app.use(cors())
app.use(express.json())

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'TodoTog',
    password: 'simplesql',
    port: 5432,
})

client.connect()

app.post('/todosubmit',async (req,res)=>{
    const {todo , todotype , tododate , todocolor , tododesc} = req.body;
    console.log(req.body)
    try {
        const result = await client.query('INSERT INTO todo (todo , todotype , tododate  , tododesc , todocolor) VALUES ($1 ,$2 ,$3 ,$4 ,$5) RETURNING *',
            [todo , todotype , tododate  , tododesc , todocolor]
        )
        console.log(result.rows)
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log('There is an error', error)
    }
    
})

app.get('/gettodo' , async (req , res)=>{
    try {
        const response = await client.query('SELECT * FROM usertodo')
        res.json(response.rows)
    } catch (error) {
        console.log('There is an error', error)
    }
})

app.listen(PORT , (req , res)=>{
    console.log("Server is Running on" , PORT)
})