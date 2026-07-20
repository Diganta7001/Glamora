const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
// Signup Form
router.get("/signup", (req, res) => {
    res.render("users/signup");
});
// Signup
router.post("/signup", async (req, res, next) => {
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
            return res.send("passwords don't match");
        }
        const newUser = new User({ name, username, email, phone, gender, dateOfBirth, address, role: "customer"});
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
// Login Form
router.get("/login", (req, res) => {

    res.render("users/login");
});
// Login
router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/users/login"
    }),
    (req, res) => {
        res.redirect("/");
    }
);

// Profile
router.get("/profile", (req, res) => {
    res.render("users/profile");
});

// Edit Profile Form
router.get("/profile/edit", (req, res) => {

    res.render("users/edit", { currUser: req.user });

});

// Update Profile
router.put("/profile", async (req, res) => {

    const {
        name,
        email,
        phone,
        gender,
        dateOfBirth,
        address
    } = req.body;

    await User.findByIdAndUpdate(req.user._id, {
        name,
        email,
        phone,
        gender,
        dateOfBirth,
        address
    });

    res.redirect("/users/profile");

});
// Logout
router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

module.exports = router;