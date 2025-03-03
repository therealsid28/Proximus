import { asyncErrorHandler } from '../utils/ErrorHandeling.js';
import Event from '../models/Event/Event.js';
import { createEventSchema } from '../utils/validation/eventValidation.js';
import AppError from '../utils/AppError.js';

const createEvent = asyncErrorHandler(async (req, res, next) => {
  const {
    title,
    description,
    category,
    date,
    time,
    venue,
    location,
    organizer,
    ticketsAvailable,
    ticketPrice,
    image,
  } = req.body;

  const data = {
    title,
    description,
    category,
    date,
    time,
    venue,
    location,
    organizer,
    ticketsAvailable,
    ticketPrice,
  };

  const { error } = createEventSchema.validate(data);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const event = await Event.create({
    ...data,
    image,
  });

  res.status(200).json({
    message: 'EVent created succesfully',
    data: {
      event,
    },
  });
});

const getAllEvents = asyncErrorHandler(async (req, res, next) => {
  const events = await Event.find().select('-attendees -__v');

  res.status(200).json({
    message: 'Here are all the events',
    data: {
      events,
    },
  });
});

export { createEvent, getAllEvents };
