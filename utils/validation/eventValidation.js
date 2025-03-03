import Joi from 'joi';

const createEventSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().min(30),
  category: Joi.string().valid('conference', 'concert', 'workshop', 'sports'),
  date: Joi.date(),
  time: Joi.string(),
  venue: Joi.string(),
  location: Joi.string(),
  organizer: Joi.string(),
  ticketsAvailable: Joi.number(),
  ticketPrice: Joi.number(),
});

export { createEventSchema };
