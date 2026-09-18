import express from 'express';
import { bootstrap } from './Modules/app.controller.js';


const PORT = process.env.PORT;
const app = express();

bootstrap(app,express);



app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
})
