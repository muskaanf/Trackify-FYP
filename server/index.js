const cors = require("cors");
const http = require("http");
const helmet = require("helmet");
const express = require("express");
const bodyParser = require('body-parser');


const app = express();
const server = http.createServer(app);


// Increase the payload size limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// middlewares
//app.use(cors({ origin: [process.env.CLIENT_URL] }));
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// utils
const appLogger = require('./utils/logger');

// startup
require('./startup/config')();
require('./startup/routes')(app); 
require("./services/socket")(app, server);
require('./startup/db')();

const PORT = process.env.PORT;
server.listen(PORT, () => appLogger.info(`Server listening on PORT: ${PORT}`));
