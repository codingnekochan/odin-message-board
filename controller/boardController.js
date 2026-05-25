const {
  handlePostMessage,
  handleGetMessageDetails,
} = require("../services/boardService");
const messages = require("../model/messages");

const getHome = (req, res) => {
  res.render("index", { messages });
};

const getForm = (req, res) => {
  res.render("form");
};

const postMessage = (req, res) => {
  const { user, text } = req.body;
  if (user && text) {
    handlePostMessage({ user, text, added: new Date() });
    res.redirect("/");
  } else {
    res.status(400).send("User name and message are required.");
  }
};

const getDetails = (req, res) => {
  const messageId = Number(req.params.id);
  console.log("Requested message ID:", messageId);
  if (messageId) {
    const message = handleGetMessageDetails(messageId);
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
