import express from 'express'
import bodyParser from 'body-parser'
import database from './database/connection.js'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import coinRoutes from './routes/coinRoutes.js'
import cors from 'cors'
dotenv.config()


const app = express();


const corsOptions = {
    origin: 'http://localhost:5001',
    optionsSuccessStatus: 200 
  };
  
  app.use(cors(corsOptions));
app.use(bodyParser.json())


database();

app.use('/api/user',userRoutes)
app.use('/api/coins',coinRoutes)


app.get('/',(req,res)=>{
    res.status(200).json({msg:'connect'})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
})