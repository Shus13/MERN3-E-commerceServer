import adminSeeder from "./adminSeeder.js";
import app from "./src/app.js";

import { envConfig } from "./src/config/config.js";
import categoryController from "./src/controllers/categoryController.js";

function startServer(){
    const port = envConfig.port || 4000
    app.listen(envConfig.port, ()=>{
        categoryController.seedCategory()
        console.log(`Server has started at port [${port}]`)
        adminSeeder()
    })
}

startServer()