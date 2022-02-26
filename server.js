const express = require("express")
const bcrypt = require('bcrypt-nodejs') 
const cors = require('cors')
const knex = require("knex")
require('dotenv').config();

const register = require("./controllers/register")
const signin = require("./controllers/signin")
const profile = require("./controllers/profile")
const image = require("./controllers/image")

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const db = knex({
    client: "pg",
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
        // host: "localhost",
        // port: 5433,
        // user: "admin",
        // password: "secret",
        // database: "smart-brain"
    }
})

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => { res.send("Success"); })

app.post("/signin", (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) })
app.put("/image", (req, res) => { image.handleImage(req, res, db) })
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) })

const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`server is listening on port ${PORT}`);
})
