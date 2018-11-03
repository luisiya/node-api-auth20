const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require("passport");
const users = require("./routes/users.js");
const tasks = require("./routes/tasks.js");
const auth = require("./routes/auth.js");

//LOAD USER MODEL
require("./models/user");
require("./config/passport")(passport);

const bodyParser = require("body-parser");

//LOAD KEYS
const keys = require("./config/keys");
mongoose.Promise = global.Promise;

//MONGOOSE CONNECT
mongoose.connect(keys.mongoURI, {
    useNewUrlParser:true
})
    .then(() => console.log("MONGO STARTED"))
    .catch(err => console.log(err));

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//COOKIE SESSION
app.use(cookieParser());

//EXPRESS SESSION
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

//SET GLOBAL VARS
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});


app.get('/', function (req, res) {
    res.send('User logout. For start using task-board you need to authorize with google')
});
//USE ROUTES
app.use("/users", users);
app.use("/tasks", tasks);
app.use("/auth", auth);

app.listen(keys.port);