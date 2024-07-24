import express from 'express'
const router = express.Router()
import { getCoin,coinHistory } from '../controller/coinController.js';

router.get('/getcoin',getCoin)
router.get(':symbol/price-history',coinHistory)




export default router;