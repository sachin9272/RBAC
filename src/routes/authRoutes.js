import express from 'express';

import {loginController, registerController } from "../controllers/authControllers.js";
const router = express.Router()

//CReate User || POST
router.post('/register', registerController)

// Login || POST
router.post('/login',loginController)
export default router;  