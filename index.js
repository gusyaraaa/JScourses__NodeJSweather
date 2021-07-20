const express = require("express");
const bodyParser = require("body-parser");
const weatherRequest = require("./requests/weather.request");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.post("/", async (req, res) => {
  const { city } = req.body;

  const { weather, error } = await weatherRequest(city);
  res.render("index", { weather, error });
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}...`);
});
