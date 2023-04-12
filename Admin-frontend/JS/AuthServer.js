const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const port = 3000;

// Set up body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable cross-origin resource sharing
app.use(cors());

// Connect to SQLite database
const db = new sqlite3.Database(":memory:");

// Create users table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

// Handle user registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Check if username is already taken
  const existingUser = await new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });

  if (existingUser) {
    res.status(409).send({ error: "Username already taken" });
    return;
  }

  // Hash password and insert user into database
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: "Internal server error" });
        return;
      }

      res.status(201).send({ message: "User created successfully" });
    }
  );
});

// Handle user login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if username exists in database
  const user = await new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });

  if (!user) {
    res.status(401).send({ error: "Invalid credentials" });
    return;
  }

  // Compare password with hashed password in database
  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    res.status(401).send({ error: "Invalid credentials" });
    return;
  }

  res.status(200).send({ message: "Login successful" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
