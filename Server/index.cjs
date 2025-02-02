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

/*This is the get todo end - Task Page (in use)*/
app.get('/gettodo' , async (req , res)=>{
    try {
        const response = await client.query('SELECT * FROM usertodo')
        res.json(response.rows)
    } catch (error) {
        console.log('There is an error', error)
    }
})

/*This is the todo submit end - Task Page (in use)*/
app.post('/todosubmit',async (req,res)=>{
    const {todo , todotype , tododate , todocolor , tododesc} = req.body;
    console.log(req.body)
    try {
        const result = await client.query('INSERT INTO usertodo (todo , todotype , tododate  , tododesc , todocolor) VALUES ($1 ,$2 ,$3 ,$4 ,$5) RETURNING *',
            [todo , todotype , tododate  , tododesc , todocolor]
        )
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log('There is an error', error)
    }
    
})

app.post('/todoupdate' , async(req,res)=>{
    const {id , updatedTodo } = req.body
    try {
        const response = await client.query('UPDATE usertodo SET todo = $1 WHERE id = $2 RETURNING *', [updatedTodo , id])
        console.log(id , updatedTodo)
        res.json(response.rows[0]);
    } catch (error) {
        console.log('Error while updating', error);
        res.status(500).send('Error updating todo');
    }
})

app.delete('/tododelete/:id' , async (req,res)=>{
    const { id } = req.params
    try {
        const response = await client.query('DELETE FROM usertodo WHERE id = $1 RETURNING *', [id])
    } catch (error) {
        console.log('Erorr while hitting the delete' , error)
    }
})

/*Listening the Port*/
app.listen(PORT , (req , res)=>{
    console.log("Server is Running on" , PORT)
})