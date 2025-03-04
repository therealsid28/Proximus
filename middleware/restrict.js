import AppError from '../utils/AppError.js';

const restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You are not Authorized', 403));
    }

    next();
  };
};

export default restrict;
