import express, { Router } from 'express'
const router = express.Router()
import {priceData} from '../controller/priceController.js'


router.get(':symbol',priceData)

export default Router