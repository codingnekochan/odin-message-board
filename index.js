const express = require("express");
const path = require("node:path");
const boardRouter = require("./routes/board");
const app = express();
const PORT = 3000;
const LOCAL_HOST = "127.0.0.1";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.use('/',boardRouter)

app.listen(PORT, LOCAL_HOST, () => {
  console.log(`Server is running on http://${LOCAL_HOST}:${PORT}`);
});
