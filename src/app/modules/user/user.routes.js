import express from 'express'; 
import { createStudent, getAllUsers, } from './user.controller.js';


const router = express.Router();

router.post("/create-users", createStudent );
router.get("/", getAllUsers);

export const userRouts = router;


