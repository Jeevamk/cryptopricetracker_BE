import express from 'express'
const router = express.Router()
import { getCoin,searchCoins } from '../controller/coinController.js';
// import {coinHistory} from '../controller/coinController.js'

router.get('/getcoin',getCoin)
router.get('/search', searchCoins);
// router.get(':symbol/price-history',coinHistory)




export default router;