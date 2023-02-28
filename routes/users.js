const express = require("express");
const router = express.Router();
const User = require("../models/user");

const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const apiKey = process.env.DATABASE_API_KEY;
    const url =
      "https://eu-central-1.aws.data.mongodb-api.com/app/data-lqvwu/endpoint/data/v1/action/find";
    const data = {
      collection: "users",
      database: "ver-sys",
      dataSource: "verteilte-systeme",
      filter: { _id: "63fb9ea54ea42a54ed806f41" }, // replace <your_user_id> with the ID of the user you want to retrieve
      projection: {},
    };

    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key": apiKey,
        Accept: "application/json",
      },
    });

    res.json(response.data.result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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
