const express = require('express');
const app = express();
const cors = require('cors');
const knex = require('knex')({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.json('API is Working')
})

app.post('/signin',(req, res) => {signin.handleSignin(req, res, knex)})

app.post('/register', (req, res) => {register.handleRegister(req, res, knex)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, knex)})

app.put('/image', (req, res) => { image.handleImage(req, res, knex)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


app.listen(process.env.PORT || 4000, () => {
    console.log(`App is running on ${process.env.PORT}` )
})