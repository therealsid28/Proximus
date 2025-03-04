import { asyncErrorHandler } from '../utils/ErrorHandeling.js';
import AppError from '../utils/AppError.js';
import jwt from 'jsonwebtoken';
import User from '../models/User/User.js';
import { promisify } from 'util';

const protect = asyncErrorHandler(async (req, res, next) => {
  // Getting the token
  const authHeader = req.headers.authorization; // Use lowercase to access headers

  if (!authHeader || !authHeader?.startsWith('Bearer ')) {
    return next(new AppError('You are not logged in', 401)); // Throw the error for proper handling
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(
      new AppError('Token not found in the Authorization header', 401)
    );
  }

  //   Verifying the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Checking if user Exists or not
  const currentUser = await User.findById(decoded._id);

  if (!currentUser) {
    return next(new AppError('Token does not belong to any user', 401));
  }

  req.user = currentUser;
  next();
});

export default protect;
