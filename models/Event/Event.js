import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['conference', 'concert', 'workshop', 'sports'],
    required: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  location: { type: String, required: true },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ticketsAvailable: { type: Number, required: true },
  ticketPrice: { type: Number, default: 0 },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Event', eventSchema);
