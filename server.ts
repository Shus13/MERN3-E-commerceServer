import app from "./src/app.js";

import { envConfig } from "./src/config/config.js";

function startServer(){
    const port = envConfig.port || 4000
    app.listen(envConfig.port, ()=>{
        console.log(`Server ha started at port [${port}]`)
    })
}

startServer()