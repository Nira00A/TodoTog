require("dotenv-flow").config();
const cors = require("cors");
const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const cookie_parser = require("cookie-parser");

// PostgreSQL Pool Configuration
const PORT = 4000;
const app = express();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookie_parser());
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tablename: "session",
    }),
    secret: process.env.ACCESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
    },
  })
);

// Routes
/* Checksession */
app.get("/checksession", (req, res) => {
  if (req.session.user_id) {
    return res.json({ 
      userid: req.session.user_id,
     });
  } else {
    return res.status(401).json({ error: "No session found" });
  }
});

/* Signup */
app.post("/register", async (req, res) => {
  const { username, useremail, userpassword } = req.body;
  const datejoined = new Date().toDateString()
  const isNewUser = true

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      useremail,
    ]);
    const isUser = result.rows[0];

    if (!username || !useremail || !userpassword) {
      return res.json({
        message: "Enter all the requirements",
      });
    }

    if (isUser) {
      return res.json({
        message: "The user already exist",
      });
    }

    const hashedPass = await bcrypt.hash(userpassword, 10);
    const account = await pool.query(
      "INSERT INTO users (username, email, password ,newuser ,date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, useremail, hashedPass , isNewUser , datejoined]
    );
    const user_id = account.rows[0].id

    req.session.user_id = user_id;
    req.session.isAuthenticated = true;

    res.status(201).json({
      message: "User created successfully!",
      userid: user_id
    });
  } catch (error) {
    res.status(500).json({ error: "User already exists or server issue" });
  }
});

/* Login */
app.post("/login", async (req, res) => {
  const { useremail, userpassword } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      useremail,
    ]);
    const user = result.rows[0];
    const user_id = result.rows[0].id

    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(userpassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    req.session.user_id = user_id;
    req.session.isAuthenticated = true;

    res.json({ 
      message: "Login successful",
      userid: user_id,
     });
    
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

/* Logout */
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ error: "Logout failed" });
    }

    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
});

/* Get Todos */
app.get("/gettodo", async (req, res) => {
  try {
    const user_id = req.session.user_id
    if (!user_id){
      return res.status(403).json('Error the session is expired')
    }

    const response = await pool.query(
      "SELECT * FROM usertodo WHERE user_id = $1",
      [user_id]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({ error: "No todos found" });
    }

    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

/* Get Todos By Tag */
app.post('/gettag', async (req,res)=>{
  const user_id = req.session.user_id
  const {tags} = req.body

  if (!user_id){
    res.status(404).json({error:'User not found'})
  }

  try {
    const result = await pool.query("SELECT * FROM usertodo WHERE todotype = $1" , [tags])
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(404).json({error:'Unable to fetch todos'})
  }
})

/* Submit a Todo */
app.post("/todosubmit", async (req, res) => {
  const { todo, todotype, todocolor, tododesc , starttime , endtime , tododate} = req.body;
  const user_id = req.session.user_id
  
  try {

    if (!user_id) {
      return res.status(400).json({
        error: "No users found or session expired",
      });
    }

    const result = await pool.query(
      "INSERT INTO usertodo (user_id , todo, todotype, tododesc, todocolor ,starttime , endtime , tododate) VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8) RETURNING *",
      [user_id, todo, todotype, tododesc, todocolor , starttime , endtime , tododate]
    );
    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.log("Error submitting todo from server", error);
    res.status(500).json({ error: "server error" });
  }
});

/* Update a Todo */
app.post("/todoupdate", async (req, res) => {
  const { id, updatedTodo } = req.body;
  try {
    const response = await pool.query(
      "UPDATE usertodo SET todo = $1 WHERE id = $2 RETURNING *",
      [updatedTodo, id]
    );
    res.json(response.rows[0]);
  } catch (error) {
    console.log("Error updating todo:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/* Delete a Todo */
app.delete("/tododelete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await pool.query(
      "DELETE FROM usertodo WHERE id = $1 AND user_id = $2 RETURNING *",
      [id , req.session.user_id]
    );
    res.json(response.rows[0]);
  } catch (error) {
    console.log("Error deleting todo:", error);
    res.status(500).json({ error: "Server error" });
  }
});


/*Features in the app*/
app.post("/newuser" , async (req , res)=>{
  const user_id = req.session.user_id

  if(!user_id){
    return res.json({err : "User not found"})
  }

  try {
    const result = await pool.query('UPDATE users SET newuser = false WHERE id = $1', [user_id])
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User ID not found" });
    }

    res.json({message : "newuser is set to False"})
  } catch (error) {
    console.log("Error changing the newuser :", error);
    res.status(500).json({ error: "Server error" });
  }
})

app.get("/getnewuser" , async (req , res)=>{
  const user_id = req.session.user_id

  if(!user_id){
    return res.json({err : "User not found"})
  }

  try {
    const result = await pool.query('SELECT newuser FROM users WHERE id = $1', [user_id])
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User ID not found" });
    }
    return res.json({result: result.rows})
  } catch (error) {
    console.log("Error changing the newuser :", error);
    res.status(500).json({ error: "Server error" });
  }
})

app.post('/userdetails' , async (req , res)=>{
  const user_id = req.session.user_id
  const {username , profilepic} = req.body
  const date= new Date().toDateString()

  try {
    const result = await pool.query('INSERT INTO userdetails (user_id , username , profilepic , date) VALUES ($1 , $2 , $3 , $4) RETURNING *' , [user_id , username , profilepic , date])
    res.status(200).json({result: result})
  } catch (error) {
    console.log("Error changing the newuser :", error);
    res.status(500).json({ error: "Server error" });
  }
})

app.get('/getuserinfo' , async (req , res)=>{
  const user_id = req.session.user_id

  try {
    const result = await pool.query('SELECT users.email , userdetails.username , userdetails.profilepic , userdetails.date FROM users JOIN userdetails ON users.id = userdetails.user_id WHERE users.id = $1', [user_id])
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json({error : error})
  }
})

app.post('/visit' , async (req , res)=>{
  const user_id = req.session.user_id
  const today = new Date().toISOString().split("T")[0]

  try {
    const result = await pool.query('SELECT streak , lastlog FROM userstreak WHERE id = $1', [user_id])
    if (result.rowCount === 0){
      const streak = 1
      await pool.query('INSERT INTO userstreak (id , lastlog , streak) VALUES ($1 , $2 , $3)' , [user_id , today , streak])
      return res.json({ streak });
    }

    let {streak , lastlog} = result.rows[0]
    const lastlogdate = new Date(lastlog)

    const diffDays = Math.floor((new Date() - lastlogdate) / (1000 * 60 * 60 * 24)); // Days since last visit

    if (diffDays === 0) {
      return res.json({ streak });
    }

    if (diffDays === 1){
      streak += 1
    }else if (diffDays > 1){
      streak = 1
    }

    await pool.query("UPDATE userstreak SET streak = $1, lastlog = $2 WHERE id = $3", [streak, today, user_id]);

    res.json({streak})
    console.log(streak)

  } catch (error) {
    console.error("Error updating streak:", error);
    res.status(500).json({ error: "Server error" });
  }
})

app.post('/project',async (req,res)=>{
  const user_id = req.session.user_id
  const {status , title , description , tag , attachment , duedate} = req.body
  try {
    const result = await pool.query('INSERT INTO project (user_id , status , title , description , tag , attachment , duedate) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7) RETURNING *', [user_id , status , title , description , tag , attachment , duedate])
    res.status(200).json({result:result})
  } catch (error) {
    console.error("Error while sumbmiting project:", error);
    res.status(500).json({ error: "Server error" });
  }
})

app.get('/getproject', async(req,res)=>{
  const user_id = req.session.user_id

  try {
    const result = await pool.query('SELECT * FROM project WHERE user_id = $1',[user_id])
    res.status(200).json(result.rows)
  } catch (error) {
    console.log('Cant get the project todos')
    res.status(500).json({ error: "Server error" });
  }
})

/* Start the Server */
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});


