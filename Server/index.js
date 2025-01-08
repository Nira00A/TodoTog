import cors from "cors"
import express from "express"
import { Client } from "pg";

const PORT = 3000
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
    try {
        const result = await client.query('INSERT INTO usertodo (todo , todotype , todostatus , tododate) VALUES ($1 ,$2 ,$3 ,$4) RETURNING *',
            []
        )

        console.log(result.rows)
    } catch (error) {
        console.log('There is an error', error)
    }
})

app.listen(PORT , (req , res)=>{
    console.log("Server is Running on" , PORT)
})