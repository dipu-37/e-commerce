import express from 'express'; 
import { createUser, getAllUsers, } from './user.controller.js';


const router = express.Router();

router.post("/create-users", createUser );
router.get("/", getAllUsers);

export const userRouts = router;


