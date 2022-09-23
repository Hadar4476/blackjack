const dotENV = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const path = require("path");

const cards = require("./routes/cards");

dotENV.config();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/cards", cards);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT;

http.listen(PORT, () => {
  console.log(`NodeJS server started at port ${PORT}.`);
});
