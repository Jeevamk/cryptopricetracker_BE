import express from 'express'
import bodyParser from 'body-parser'
import database from './database/connection.js'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
dotenv.config()


const app = express();

app.use(bodyParser.json())

database();

app.use('/api/user',userRoutes)



const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
})