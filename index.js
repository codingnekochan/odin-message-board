const express = require("express");
const path = require("node:path");
const boardRouter = require("./routes/board");
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.use('/',boardRouter)

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
