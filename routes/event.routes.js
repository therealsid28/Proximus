import express from 'express';
import {
  createEvent,
  getAllEvents,
  updateEvent,
} from '../controllers/event.controller.js';

const router = express.Router();

router.post('/event', createEvent);
router.patch('/event', updateEvent);
router.get('/events', getAllEvents);

export default router;
