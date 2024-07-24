import express from 'express'
const router = express.Router()
import { getCoin } from '../controller/coinController.js';

router.get('/getcoin',getCoin)




export default router;