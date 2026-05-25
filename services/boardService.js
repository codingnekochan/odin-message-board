const messages = require("../model/messages");

function handlePostMessage(message) {
  return messages.push(message);
}

function handleGetMessageDetails(id) {
  return messages.find((_, index) => index === id - 1);
}

module.exports = {
  handlePostMessage,
  handleGetMessageDetails,
};
