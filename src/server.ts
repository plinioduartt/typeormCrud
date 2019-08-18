import express     = require('express');
import bodyParser  = require("body-parser");
import routes      = require("./routes");
import cors        = require("cors");
import { createConnection } from "typeorm";

const HOST = "0.0.0.0";
const PORT = 3000;


// 192.168.99.100 ---> Endereço correspondente ao da localhost da VM configurada durante o desenvolvimento
// Se necessário, mudar o hostDB no arquivo ./ormconfig.json na raíz do projeto
 
createConnection().then( async (conn) => {

    // Inicia as migrations no banco...
    await conn.runMigrations();

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    app.use(routes);

    app.listen(PORT, HOST);

}).catch( (err) => {
    console.log("Erro ao conectar --> ",err)
});
