import { Router } from 'express'
const router = Router()

import  { getUser, getUserById, createUser, updateUser, deleteUser } from '../Controller/user.controller.js';

router.get("/", getUser);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;