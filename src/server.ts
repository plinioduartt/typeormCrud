import express = require('express');
import bodyParser = require("body-parser");
import routes = require("./routes");
import cors = require("cors");
import { createConnection } from "typeorm";

const HOST = "0.0.0.0";
const PORT = 3001;
// const dbConnection = require("./database/connect");
// const mongoose = require("mongoose");
// mongoose.connect('...')...

createConnection().then( async (conn) => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    app.use(routes);

    app.listen(PORT, HOST);

}).catch( async err => console.log(err));
