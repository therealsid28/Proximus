import express from 'express';
import {
  createEvent,
  getAllEvents,
  updateEvent,
} from '../controllers/event.controller.js';
import restrict from '../middleware/restrict.js';
import protect from '../middleware/protect.js';

const router = express.Router();

router.post('/event', protect, restrict('organizer'), createEvent);
router.patch('/event', updateEvent);
router.get('/events', getAllEvents);

export default router;
