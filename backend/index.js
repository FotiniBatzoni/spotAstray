const express = require("express");
const app = express();

// app.use(logger);

require("dotenv").config();
require("./startup/logging")();
require("./startup/db")();
require("./startup/routes")(app);

const port = process.env.PORT || 4444;

app.listen(port, () => console.log(`Listening on port ${port}...`));
