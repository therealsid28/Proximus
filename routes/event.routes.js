import express from 'express';
import { createEvent, getAllEvents } from '../controllers/event.controller.js';

const router = express.Router();

router.post('/event', createEvent);
router.get('/events', getAllEvents);

export default router;
