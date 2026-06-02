const { body, validationResult, matchedData } = require("express-validator");
const db = require("../model/queries");

const getHome = async (req, res) => {
  const messages = await db.handleGetMessages();
  res.render("index", { messages });
};

const getForm = (req, res) => {
  res.render("form");
};
const validateValues = [
  body("username")
    .notEmpty()
    .withMessage("Please enter a valid username")
    .trim(),
  body("text").optional({ values: "falsy" }).trim(),
];
const postMessage = [
  validateValues,
  async (req, res) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
      const { username, text } = matchedData(req);
      await db.handlePostMessage({
        username,
        text,
      });
      res.redirect("/");
    } else {
      res.status(400).send("User name are required.");
    }
  },
];

const getDetails = async (req, res) => {
  const messageId = Number(req.params.id);
  console.log("Requested message ID:", messageId);
  if (messageId) {
    const message = await db.handleGetMessageDetails(messageId);
    console.log("Retrieved message:", message);
    if (message) {
      res.render("details", { message });
    } else {
      res.status(404).render("404");
    }
  } else {
    res.status(404).render("404");
  }
};
module.exports = { postMessage, getDetails, getHome, getForm };
