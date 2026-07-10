const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Service = require("./models/service");
const User = require("./models/user");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

async function main() {
    await mongoose.connect(
        "mongodb://127.0.0.1:27017/glamora"
    );
}

main()
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {

    console.log(err);

});

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
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {

    res.locals.currUser = req.user;

    next();

});

app.get("/", async (req, res) => {
    const allServices = await Service.find({});
    res.render("home", { allServices });
});
app.get("/home", async (req, res) => {
    const allServices = await Service.find({});
    res.render("home", { allServices });
});
app.get("/services", async (req, res) => {
    const services = await Service.find({});
    res.render("services/index", { services });
});
app.get("/services/new", (req, res) => {
    res.render("services/new");
});
app.post("/services", async (req, res) => {
    const newService = new Service(req.body);
    await newService.save();
    res.redirect("/services");
});
app.get("/services/:id", async (req, res) => {
    const { id } = req.params;
    const service = await Service.findById(id);
    res.render("services/show", { service });
});
app.get("/services/:id/edit", async (req, res) => {
    const { id } = req.params;
    const service = await Service.findById(id);
    res.render("services/edit", { service });
});
app.put("/services/:id", async (req, res) => {
    const { id } = req.params;
    await Service.findByIdAndUpdate(id, req.body);
    res.redirect(`/services/${id}`);
});
app.delete("/services/:id", async (req, res) => {
    const { id } = req.params;
    await Service.findByIdAndDelete(id);
    res.redirect("/services");
});
app.get("/users/signup", (req, res) => {
    res.render("users/signup");

});
app.post("/users/signup", async (req, res, next) => {
    try {
        const {
         name,
         username,
         email,
         phone,
         gender,
         dateOfBirth,
         address,
         password,
         confirmPassword
        } = req.body;
        if (password !== confirmPassword) {
            return res.send("Passwords don't match.");
        }
        const newUser = new User({
            name,
            username,
            email,
            phone,
            gender,
            dateOfBirth,
            address,
            role: "customer"
        });

        const registeredUser =
            await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    }
    catch (err) {
        console.log(err);
        res.send(err.message);
    }
});
app.get("/users/login", (req, res) => {
    res.render("users/login");
});
app.post("/users/login",
    passport.authenticate("local", {

        failureRedirect: "/users/login"
    }),

    (req, res) => {
        res.redirect("/");
    }

);
app.get("/users/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });

});
app.get("/users/profile", (req, res) => {
    res.render("users/profile");
});
const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});