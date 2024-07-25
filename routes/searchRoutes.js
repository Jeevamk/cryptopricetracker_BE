import express from 'express'
const router = express.Router()
import { getHistory ,postHistory,removeHistory } from '../controller/searchController.js'


router.get('/:userId',getHistory)
router.post('/:userId',postHistory)
router.delete('/:userId/:term',removeHistory)



export default router