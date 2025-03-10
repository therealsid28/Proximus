# Proximus (Event Management Application)

The backend of the event management app is built using Node.js and Express.js, with MongoDB (Mongoose ORM) for database management. It handles user authentication using JWT and OAuth (Google login), with role-based access control for organizers, attendees, and admins.

Event-related operations include creating, updating, and deleting events, along with ticket management, where users can purchase tickets, generate QR codes, and request refunds. The backend also supports search and filtering, AI-powered event recommendations, and map integration using external APIs.

Payment processing is managed via Stripe, while notifications (email, SMS, and push) are powered by Nodemailer, Twilio, and Firebase. The admin panel provides event moderation, fraud detection, and user activity tracking. The backend is deployed on AWS, Railway, or Render, with MongoDB Atlas as the database.
