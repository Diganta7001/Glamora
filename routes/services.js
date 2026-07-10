const express = require("express");
const router = express.Router();
const Service = require("../models/service");
// Index
router.get("/", async (req, res) => {
    const services = await Service.find({});
    res.render("services/index", { services });
});
// New
router.get("/new", (req, res) => {
    res.render("services/new");
});
// Create
router.post("/", async (req, res) => {
    const newService = new Service(req.body);
    await newService.save();
    res.redirect("/services");
});
// Show
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const service = await Service.findById(id);
    res.render("services/show", { service });
});
// Edit
router.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const service = await Service.findById(id);
    res.render("services/edit", { service });
});
// Update
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    await Service.findByIdAndUpdate(id, req.body);
    res.redirect(`/services/${id}`);
});
// Delete
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Service.findByIdAndDelete(id);
    res.redirect("/services");
});
module.exports = router;