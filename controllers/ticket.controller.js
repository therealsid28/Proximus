import AppError from '../utils/AppError.js';
import { asyncErrorHandler } from '../utils/ErrorHandeling.js';
import { createTicket } from '../utils/ticket/createTicket.js';
import { Buffer } from 'buffer';

const getTicket = asyncErrorHandler(async (req, res, next) => {
  const { eventId, userId, paymentStatus } = req.body;

  //   if (!user || !event || !paymentStatus) {
  //     return next(new AppError('Give all the details', 400));
  //   }

  const ticket = await createTicket({ eventId });

  if (!ticket) {
    return next(new AppError('Error generating ticket', 500));
  }

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'inline; filename=generated_ticket.pdf',
  });

  res.end(Buffer.from(ticket));

  //   res.send(ticket);

  //   res.status(200).json({
  //     message: 'Your ticket has been created succesfylly',
  //   });
});

export { getTicket };
