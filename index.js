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

app.get('/',(req,res)=>{
    res.status(200).json({msg:'scursd'})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
})