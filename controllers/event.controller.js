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
    message: 'Event created succesfully',
    data: {
      event,
    },
  });
});

const updateEvent = asyncErrorHandler(async (req, res, next) => {
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
    eventId,
  } = req.body;

  if (!eventId) {
    return next(new AppError('Provide the event Id', 404));
  }

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

  const updatedDoc = await Event.findByIdAndUpdate(
    eventId,
    { $set: { ...data, image } },
    { new: true, runValidators: true }
  );

  const { error } = createEventSchema.validate(data);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  res.status(201).json({
    message: 'Event updated succesfully',
    data: {
      event: updatedDoc,
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

export { createEvent, getAllEvents, updateEvent };
