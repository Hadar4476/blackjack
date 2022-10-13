const dotENV = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);

const cards = require("./routes/cards");

dotENV.config();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/cards", cards);

const PORT = process.env.PORT;

http.listen(PORT, () => {
  console.log(`NodeJS server started at port ${PORT}.`);
});
