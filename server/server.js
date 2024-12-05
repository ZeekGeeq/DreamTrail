//all necessary dependencies included
//mongoose simplifies the whole connecting to database part
//express simplifies the process of creating the backend (it does a lot)
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const trailRoute = require('./routes/trails');
const passport = require('./config/passport');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const path = require('path');
const calendarRoutes = require('./routes/calendar');


const app = express()

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 86400000 }
  }));

app.use(passport.initialize());

app.use(passport.session());

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

//use the path api/trails if testing in Postman
app.use('/api/trails',trailRoute)


app.use('/api/auth', authRoutes);        // Google authentication routes

app.use('/api/users', userRoutes); 

app.use('/api/calendar', calendarRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:4000");
})

app.get("/messages", (req, res) => {
    res.send("Hello");
});

app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
});

app.post('/api/auth/logout', (req, res) => {
    req.logout(() => {
      req.session.destroy(() => {
        res.clearCookie('connect.sid'); // clear session cookie
        res.status(200).send({ message: 'Logged out successfully' });
      });
    });
  });
  

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });
  }

//db connection
//should log "connected to db and listening on port"
//if database connection is established
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, () =>{
            console.log('Connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

process.env