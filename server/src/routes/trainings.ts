import express from "express";
import handleHost from "../middleware/host-handler";
import {
    getAllTrainings,
    createTraining,
    getTraining,
    updateTraining,
    deleteTraining
} from "../controllers/trainings";

const router = express.Router();

router.get("/", getAllTrainings);
router.post("/", handleHost, createTraining);
router.get("/:id", getTraining);
router.patch("/:id", handleHost, updateTraining);
router.delete("/:id", handleHost, deleteTraining);


export default router;