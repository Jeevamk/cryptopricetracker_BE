import express from 'express'
import bodyParser from 'body-parser'
import database from './database/connection.js'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import coinRoutes from './routes/coinRoutes.js'
import priceRoutes from './routes/priceRoutes.js'
import cors from 'cors'
import { fetchAndStorePrices } from './controller/coinController.js'
import cron from 'node-cron';
dotenv.config()


const app = express();


const corsOptions = {
    origin: 'http://localhost:5001',
    optionsSuccessStatus: 200 
  };
  
  app.use(cors(corsOptions));
app.use(bodyParser.json())


database();
cron.schedule('* * * * *', fetchAndStorePrices);

app.use('/api/user',userRoutes)
app.use('/api/coins',coinRoutes)
app.use('/api/prices',priceRoutes)


app.get('/',(req,res)=>{
    res.status(200).json({msg:'connect'})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
})