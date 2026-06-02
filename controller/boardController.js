const db = require("../model/queries");

const getHome = async (req, res) => {
  const messages = await db.handleGetMessages();
  res.render("index", { messages });
};

const getForm = (req, res) => {
  res.render("form");
};

const postMessage = async (req, res) => {
  const { username, text } = req.body;
  if (username && text) {
    await db.handlePostMessage({
      username,
      text,
    });
    res.redirect("/");
  } else {
    res.status(400).send("User name and message are required.");
  }
};

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
