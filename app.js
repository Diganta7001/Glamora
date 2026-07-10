const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const Service = require("./models/service");
//routes
const serviceRoutes = require("./routes/services");
const userRoutes = require("./routes/users");
//app confgi
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
// ====================
// Database
// ====================
async function main() {
    await mongoose.connect(        "mongodb://127.0.0.1:27017/glamora"
    );
}

main()
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log(err);
});
// ====================
// Session
// ====================
const sessionConfig = {
    secret: "glamoraSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};
app.use(session(sessionConfig));
// ====================
// Passport
// ====================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ====================
// Global Variables
// ====================
app.use((req, res, next) => {
    res.locals.currUser = req.user;
    next();
});
// ====================
// Landing Page
// ====================
app.get("/", async (req, res) => {
    const allServices = await Service.find({});
    res.render("home", { allServices });
});
app.get("/home", async (req, res) => {
    const allServices = await Service.find({});
    res.render("home", { allServices });
});
// ====================
// Routes
// ====================
app.use("/services", serviceRoutes);
app.use("/users", userRoutes);
// ====================
const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});