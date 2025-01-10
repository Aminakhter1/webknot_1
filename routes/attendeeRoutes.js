import express from 'express';
import { getAllAttendees, createAttendee, deleteAttendee } from '../controllers/attendeeController.js';

const router = express.Router();

router.get('/', getAllAttendees);
router.post('/', createAttendee);
router.delete('/:id', deleteAttendee);

export default router;
