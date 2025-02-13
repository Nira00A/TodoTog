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
      maxAge: 1000 * 60 * 60, 
      httpOnly: true,
    },
  })
);

// Routes
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
    console.log(response.rows);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

/* Submit a Todo */
app.post("/todosubmit", async (req, res) => {
  const { todo, todotype, tododate, todocolor, tododesc } = req.body;
  const user_id = req.session.user_id
  
  try {

    if (!user_id) {
      return res.status(400).json({
        error: "No users found or session expired",
      });
    }

    const result = await pool.query(
      "INSERT INTO usertodo (user_id , todo, todotype, tododate, tododesc, todocolor) VALUES ($1, $2, $3, $4, $5 , $6) RETURNING *",
      [user_id, todo, todotype, tododate, tododesc, todocolor]
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

/* Signup */
app.post("/register", async (req, res) => {
  const { username, useremail, userpassword } = req.body;

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
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, useremail, hashedPass]
    );
    const user_id = account.rows[0].id

    req.session.user_id = user_id;
    req.session.isAuthenticated = true;

    res.status(201).json({
      message: "User created successfully!",
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

    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(userpassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    
    req.session.user_id = user.id;
    req.session.isAuthenticated = true;

    res.json({ message: "Login successful" });
    
  } catch (error) {
    console.error("Login error:", error);
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

/* Start the Server */
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
