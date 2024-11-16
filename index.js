const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
const http = require("http");

require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

require("./swaggerConfig")(app);

dbConnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));
app.use("/api/sensors/", require("./routes/sensors"));

const server = http.createServer(app);


server.listen(PORT, () =>
  console.log(`Servidor corriendo http://localhost:${PORT}`)
);
