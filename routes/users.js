const express = require("express");
const router = express.Router();
const User = require("../models/user");

const axios = require("axios");

router.get("/", async (req, res) => {});

//Getting one
router.get("/:id", (req, res) => {
  res.send(req.params.id);
});
//Crating one

router.post("/", async (req, res) => {});

//Updating one
router.patch("/", (req, res) => {});
//Deleting one
router.delete("/:id", (req, res) => {});

module.exports = router;
