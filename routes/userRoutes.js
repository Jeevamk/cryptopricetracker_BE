import express from 'express'
const router = express.Router()

import { register,verifyEmail } from '../controller/userController.js'


//Register route
router.post('/register',register)

router.get('/verify/:token', verifyEmail)

// router.post('/login',login)

export default router;
