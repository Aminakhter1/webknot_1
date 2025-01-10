import express from 'express';
import { getTasksByEvent, createTask, updateTaskStatus } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getTasksByEvent);
router.post('/', createTask);
router.patch('/:id', updateTaskStatus);

export default router;