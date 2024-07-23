import express from 'express'
const router = express.Router()

import { register } from '../controller/userController.js'


//Register route
router.post('/register',register)