const mongoose = require("mongoose");

const User = require("../models/user");
const Service = require("../models/service");

const { users, services } = require("./data");

main()
.then(() => {
    console.log("Connected to MongoDB");
    initDB();
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/glamora");
}

async function initDB() {

    await User.deleteMany({});
    await Service.deleteMany({});

    // Register users so passwords are hashed
    for (let user of users) {

        const { password, ...userData } = user;

        const newUser = new User(userData);

        await User.register(newUser, password);
    }

    await Service.insertMany(services);

    console.log("Database Initialized Successfully");

    mongoose.connection.close();
}