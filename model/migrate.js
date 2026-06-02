const { Client } = require("pg");

const connectionString = process.env.CONNECTION_STRING;

const createDBQuery = `
CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
username VARCHAR(255),
text TEXT,
added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

async function main() {
  console.log("creating DB");
  const client = new Client({
    connectionString,
  });
  await client.connect();
  await client.query(createDBQuery);
  await client.end();
  console.log("Done");
}

main();
