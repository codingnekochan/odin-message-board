const pool = require("./pool");

async function handleGetMessages(params) {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM messages;
      `);
    return rows;
  } catch (error) {
    console.error("ERROR GETTING MESSAGES", error);
    throw new Error(error);
  }
}

async function handlePostMessage({ username, text }) {
  try {
    await pool.query(
      `
      INSERT INTO messages(username,text) 
      VALUES($1,$2);
      `,
      [username, text],
    );
  } catch (error) {
    console.error("ERROR POSTING MESSAGES", error);
    throw new Error(error);
  }
}

async function handleGetMessageDetails(id) {
  try {
    const { rows } = await pool.query(
      `
      SELECT * FROM messages
      WHERE id = $1; 
    `,
      [id],
    );
    return rows[0];
  } catch (error) {
    console.error("ERROR GETTING MESSAGE DETAILS", error);
    throw new Error(error);
  }
}

module.exports = {
  handleGetMessages,
  handlePostMessage,
  handleGetMessageDetails,
};
