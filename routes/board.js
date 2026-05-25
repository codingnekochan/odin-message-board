const express = require("express");
const router = express.Router();
const {
  postMessage,
  getDetails,
  getHome,
  getForm
} = require("../controller/boardController");

router.get("/", getHome);

router.get("/new", getForm);
router.post("/new", postMessage);
router.get("/details/:id", getDetails);

module.exports = router;
