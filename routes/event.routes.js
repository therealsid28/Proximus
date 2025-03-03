import express from 'express';
import { createEvent } from '../controllers/event.controller.js';

const router = express.Router();

router.post('/event', createEvent);

export default router;
