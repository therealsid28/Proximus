import express from 'express';
import { getTicket } from '../controllers/ticket.controller.js';

const router = express.Router();

router.post('/get-ticket', getTicket);

export default router;
