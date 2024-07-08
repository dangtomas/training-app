import express from "express";
import handleHost from "../middleware/host-handler";

import {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/users';

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", handleHost, createUser);
router.get("/:id", getUser);
router.patch("/:id", handleHost, updateUser);
router.delete("/:id", handleHost, deleteUser);

export default router;